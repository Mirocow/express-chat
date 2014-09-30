module.exports = function (app, model) {

  var Room = model.mongoose.model('Room')
    , Message = model.mongoose.model('Message')
    , Counter = model.mongoose.model('Counter')
    , IP = model.mongoose.model('IP')
    , Step = app.libs.Step
    , Http = require('http');

  //var anonCounter = new Counter({_id: "Anon"});

  var MAX_MESSAGE_LEN = app.config.limits.maxMessageLength;
  var MAX_USERNAME_LEN = app.config.limits.maxUsernameLength;

  var chatIOUrl = app.routes.io("chat.socket");

  var actions = {};

  var roomid = '';

  actions.index = function (req, res, next) {

    roomid = req.params.roomid;

    Room.findOne({roomid: roomid}, function (err, room) {

      if (err || !room) {
        //res.redirect(app.routes.url("index.index"));
        res.render('chat.html', { data: {
          MessageFlash: 'Комната ' + roomid + ' не найдена',
          messageInput: '&nbsp;'
        } });
        return;
      }

      var roomName = room.title || "Room " + room.id;
      res.render('chat.html', { data: {
        title: roomName,
        messagesFlash: '&nbsp;'
      } });
      return;

    });

  };

  actions.socket = function (socket) {
    var hs = socket.handshake;

    var sroomid = null;

    if (!hs.session.rooms) {
      hs.session.rooms = {};
    }

    socket.on('join room', function (roomid, lastMessageNum, callback) {

      if (typeof callback !== "function") {
        return;
      }
      if (typeof roomid !== "string" || roomid.length > 64) {
        callback('roomid invalid');
        return;
      }
      if (typeof lastMessageNum !== "number" || lastMessageNum < 0) {
        callback('lastMessageNum invalid');
        return;
      }

      sroomid = roomid;

      Step(function reloadSession() {
          hs.session.reload(this);
        }, function userExists() {
          var next = this;

          if (hs.session.rooms[roomid]) {

            var userinfo = hs.session.rooms[roomid];
            var username = userinfo.username;
            var sid = userinfo.sid;

            if (sid && sid != socket.id && app.io.sockets[sid]) { // disconnect previous socket
              app.io.sockets[sid].disconnect();
            }

            next(null, username);
          } else {
            next(null, false);
          }

        }, function generateUsername(err, username) {
          var next = this;

          if (username) {
            next(null, username);
            return;
          }

          /*Counter.getNextValue(roomid, function(errc, value) {
           if(errc || value == null) {
           callback('server could not generate a username : '+errc.message);
           return;
           }
           if(value == 1){
           username = "OP";
           }
           else {
           username = "Anonymous"+value;
           }
           next(null, username);
           });*/

          username = "Всевышний";

          next(null, username);

        }, function sendUsername(err, username) {
          var next = this;
          hs.session.rooms[roomid] = {
            username: username, sid: socket.id
          };
          callback(null, username);
          socket.broadcast.to(roomid).json.emit('user joined', username);
          next(null, username);
        }, function addUser(err, username) {
          var next = this;
          Room.findOneAndUpdate({roomid: roomid}, {"$addToSet": {users: username}}, function (err) {
            next(); // next even if error
          });
        }, function sendMessagesAndUsers() {

          var messageCallback = this.parallel();
          var userCallback = this.parallel();

          Message.allFrom(roomid, lastMessageNum + 1, function (err, messages) {
            if (!err && messages) {
              messages.forEach(function (msg) {
                socket.emit("new message", msg.publicFields());
              });
              if(err){

                console.log("Error: " + err);

              }
            }
            messageCallback();
          });

          Room.findOne({roomid: roomid}, "users", function (err, room) {
            if (!err && room) {
              socket.emit('users', room.users);
            }
            userCallback();
          });

        }, function joinRoom() {
          var next = this;
          socket.join(roomid);
          hs.session.save(next);
        }, function ready() {
          socket.emit('ready');
        });
    });

    socket.on('message', function (data) {

      if (typeof data !== "string" || data.length > MAX_MESSAGE_LEN) {
        return;
      }

      if (!hs.session.rooms || !hs.session.rooms[sroomid]) {
        return;
      }

      Step(function canChat() {

          var nextstep = this;

          IP.loadFromSocket(socket, function (err, ip) {
            if (!ip.canChat()) {
              socket.emit('new message', { username: "system", body: "No flood !"});
            } else {
              ip.chat(nextstep);
            }
          });

        }, function chat() {

          var nextstep = this;

          var userinfo = hs.session.rooms[sroomid];
          var username = userinfo.username;
          var body = data;

          var message = new Message({
            roomid: sroomid,
            username: username,
            body: body,
            userip: socket.handshake.address.address
          });

          message.save(function (err) {

            if (err) console.log(err);

            var fields = message.publicFields();

            app.io.of(chatIOUrl).in(sroomid).emit('new message', fields);

            nextstep(fields);

          });

        }, function sendMessageRealPlexor(fields) {

          var data = {
            'event': 'new-message',
            'message': [
              {
                'id': fields.id,
                "text": fields.body,
                'username': fields.username,
                'date': Math.round(fields.date.getTime() / 1000) //fields.date
                //'roomid': fields.roomid
              }
            ]
          };

          var data = JSON.stringify(data);

          var curler = require("curler").Curler;
          var curl = new curler();

          var options = {
            method: "POST",
            url: 'http://localhost:10010/',
            userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 5_0 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko) Version/5.1 Mobile/9A334 Safari/7534.48.3',
            headers: {
              'Content-Type': 'application/json',
              'Connection': 'close',
              'X-Realplexor': 'identifier=system,*' + sroomid.replace('-', '_')
            },
            data: data,
            timeout: 1000,
            connectionTimeout: 3000
          };

          var startDate = Date.now();
          curl.request(options, function (err, res, bodyData) {
            var duration = (Date.now() - startDate);
            if (err) {
              console.log("Error: " + err);
            } else {
              //console.log('statusCode: %s', res.statusCode);
              //console.log('bodyData: %s', bodyData);
            }

            //console.log("curler (libcurl) performed http request in %s ms. dnsTime: %s, connectTime: %s, preTransferTime: %s, startTransferTime: %s, totalTime: %s", duration, res.dnsTime, res.connectTime, res.preTransferTime, res.startTransferTime, res.totalTime);
          });


        });
    });

    /*socket.on('change name', function(data, callback) {
     if(typeof callback !== "function") {
     return;
     }
     if(typeof data !== "string" || data.length > MAX_USERNAME_LEN) {
     callback('username invalid');
     return;
     }
     var newname = data;
     Step(
     function reloadSession() {
     hs.session.reload(this);
     },
     // TODO: make $addToSet an $pull into one atomic operation
     // Forbidden by MongoDB for now : https://jira.mongodb.org/browse/SERVER-1050
     function addNewUsername(err) {
     var next = this;
     if(err) return next(err);
     if(!hs.session.rooms || !hs.session.rooms[sroomid]) {
     callback('user info not found');
     return;
     }
     var oldname = hs.session.rooms[sroomid].username;
     Room.update({
     roomid: sroomid,
     users: { $ne: newname }
     }, {
     "$addToSet": { users: newname }
     }, function(err, updated) {
     if(err) return next(err);
     if(updated < 1) {
     callback('username exist');
     } else {
     next(null, oldname);
     }
     });
     },
     function removeOldUsername(err, oldname) {
     var next = this;
     if(err) return next(err);
     Room.update({ roomid: sroomid }, {
     "$pull": { users: oldname }
     }, function(err) {
     next(null, oldname);
     });
     },
     function updateUserInfo(err, oldname) {
     var next = this;
     if(err) return next(err);
     hs.session.rooms[sroomid].username = newname;
     hs.session.save(function(err) {
     next(err, oldname);
     });
     },
     function notifyUsernameChange(err, oldname) {
     var next = this;
     if(err) return next(err);
     var renameObj = {oldname: oldname, newname: newname};
     socket.broadcast.to(sroomid).json.emit('user renamed', renameObj);
     callback(null, renameObj);
     },
     function handleError(err) {
     if(err) console.error(err);
     }
     );
     });*/

    socket.on('disconnect', function () {
      if (hs.session.rooms && hs.session.rooms[sroomid]) {

        var username = hs.session.rooms[sroomid].username;
        Room.findOneAndUpdate(sroomid, {"$pull": {users: username}}, function (err, doc) {
          socket.broadcast.to(sroomid).json.emit("user left", username);
        });

      }
    });

  };

  return actions;

}


