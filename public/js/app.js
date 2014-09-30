
$(document).ready(function() {

	var roompath = document.location.pathname;
	var roomid = roompath.replace('/nodejs/r/', '');
	var nextmsgnum = 1;
	
	function datePrefix(dateObj) {
		dateObj = dateObj || new Date();
		return '<small class="pull-right text-muted"><i class="fa fa-clock-o"></i>'+date('j M Y, g:i:s a', (dateObj.getTime()/1000))+'</small>';
	}
	
	var app = {

		ROOMID          : roomid,
		MAX_MSG_LEN     : 3000,
		MAX_USR_LEN     : 50,
		MAX_ROOMID_LEN  : 64,
		msgCount        : 0,

    isMessages        : false,
		
		users           : [],
		username        : 'Anonymous',

		messageBox          : $('#message'),
		//nameBox             : $('#name'),
		messagesBox         : $('#messages'),
		//usersBox            : $('#users'),
		submitMessageButton : $('#submitMessageButton'),
		//renameButton        : $('#renameButton'),
		
		/*showWelcomeMessage: function() {
			app.addMessageToUl("----------------------------------------------");
			app.showSystemMessage({ body : "Welcome on the room. You are known as "+htmlentities(app.username)+"."});
		},*/
		
		addMessageToUl: function(msg, thisName, idMsg) {

      var preDiv = app.messagesBox.parent().get(0);
			var atBottom = (preDiv.scrollHeight - preDiv.scrollTop) == preDiv.clientHeight;

			if(thisName === app.username){
				app.messagesBox.append('<li data-id="'+idMsg+'" class="left clearfix"><div class="chat-body clearfix">'+msg+'</div></li>');
			}else{
				app.messagesBox.append('<li data-id="'+idMsg+'" class="right clearfix"><div class="chat-body clearfix">'+msg+'</div></li>');
			}
			
			if(atBottom) {
				preDiv.scrollTop = app.messagesBox.get(0).scrollHeight;
			}

		},
		
	
		showMessage: function(msg) {
			var thisName = msg.username;
			var msgStr = '<div class="header">'
							+ '<strong class="primary-font">'+htmlentities(thisName)+'</strong>'
							+ datePrefix(msg.date)
							+ '</div>';

			msgStr += '<p>'+linkify(htmlentities(msg.body, 'ENT_NOQUOTES'))+'</p>';

      if(!app.isMessages){
        app.isMessages = true;
        app.messagesBox.html('');
      }
			app.addMessageToUl(msgStr, thisName, msg.id);
		},

		showSystemMessage: function(msg) {
			app.addMessageToUl(datePrefix(msg.date) + '* ' + msg.body);
		}

/*
		setUsers: function(newusers) {
			if(newusers.constructor === Array) {
				app.users = newusers;
				app.refreshUserList();
			}
		},

		
		userJoined: function(newuser) {
			if(newuser != null) {
				app.users.push(newuser);
				app.refreshUserList();
				app.showSystemMessage({ body: newuser+" joined the room." });
			}
		},

		userLeft: function(olduser) {
			for(var i=0; i<app.users.length; i++) {
				if(app.users[i] === olduser) {
					app.users.splice(i,1);
					break;
				}
			}
			app.refreshUserList();
			app.showSystemMessage({ body: olduser+" left the room." });
		},

		userRenamed: function(obj) {
			var oldname = obj.oldname;
			var newname = obj.newname;
			for(var i=0; i<app.users.length; i++) {
				if(app.users[i] === oldname) {
					app.users[i] = newname;
					break;
				}
			}
			app.refreshUserList();
			if(oldname == app.username) {
				msg = "You are now known as "+htmlentities(newname)+".";
				app.username = newname;
				app.nameBox.val(newname);
			} else {
				msg = htmlentities(oldname)+" is now known as "+htmlentities(newname)+".";
			}
			app.showSystemMessage({ body: msg });
		},

		refreshUserList: function() {
			var allusers = app.users.slice(0);
			allusers.sort(function(a,b){return a.toLowerCase() > b.toLowerCase()});
			app.usersBox.empty();
			$.each(allusers, function(i, usr) {
				app.usersBox.append('<li>' + htmlentities(usr) + '</li>');
			});
		}*/
		
	}

  if(typeof hrefChat == 'undefined'){

    window.location = '/crm/index.php?r=user/default/logout'

  }

	runChatClient(app);

})

