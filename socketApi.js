var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
});

socketApi.sendNotification = function(message) {
    io.sockets.emit('notifications', message);
}

module.exports = socketApi;
