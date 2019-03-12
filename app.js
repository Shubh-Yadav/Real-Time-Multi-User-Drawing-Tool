var express = require('express');
var path = require('path');
var app = express();
var server = app.listen(process.env.PORT || 3000);
var io = require('socket.io').listen(server);

app.use(express.static(path.join(__dirname, 'template')));

app.get('/', function(req, res){
	res.sendFile('template/index.html', {root: __dirname});
});

io.sockets.on('connection', function(socket){

    socket.on('drawLine', function(data){
        socket.broadcast.emit('drawLine', data);
    });

    socket.on('stopDrawLine', function(){
        socket.broadcast.emit('stopDrawLine');
    });
});

