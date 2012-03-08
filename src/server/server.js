var io = require('socket.io').listen(1337);

application = {
    models: {},
    views: {}
};

io.sockets.on('connection', function (socket) {

    // login
    // gamelist
    // create game
    // join game
    // get game
    // turn tiles

    socket.on('login', function (data) {
        require('./models/user.js');

        var userData = {
            username: data.model.username,
            password: data.model.password
        };

        var user = new application.models.user(userData);

        user.setSocket(socket);
        user.setSessionid(data.sessionid);
        user.setCbid(data.id);

        user.checkLogin();
    });

    socket.on('game', function(data) {

        require('./models/game.js');

        var game = new application.models.game();

        game.setSocket(socket);
        game.setSessionid(data.sessionid);
        game.setCbid(data.id);

        game.getGames();

        /*var payload = [
            {id: 1,
            created: '08.03.2012 07:12',
            finished: false,
            started: false,
            players: 2}
        ];


        var data = {
            success: 'success',
            id: request.id,
            sessionid: request.sessionid,
            payload: payload
        }

        socket.emit('reply', data);*/

    });

});

console.log('Socket Server started');