
module.exports = function(app) {

    var express = app.libs.express;
    
    return {
        urls : [
            //["/nodejs", "index.index", "get"  ],
            //["/nodejs/rooms/create", "index.createRoom","post"],
            ["/nodejs/r/:roomid", "chat.index","get"]
        ]
        
      , ios : [
            ["/nodejs/chat", "chat.socket", "on.connection"]
        ]
    };

}

