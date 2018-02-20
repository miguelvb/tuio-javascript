
var app = require('express')(),
    express = require('express'),
    http = require('http').Server(app),
    io = require('socket.io')(http),
    Caress = require("caress-server"),
    path = require('path');

var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

app.get('/', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/index.html');
});

app.get('/basic-canvas/index.html', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/basic-canvas/index.html');
});
app.get('/basic-hammerjs/index.html', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/basic-hammerjs/index.html');
});
app.get('/drag-hammerjs/index.html', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/drag-hammerjs/index.html');
});
app.get('/touch-toy/index.html', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/touch-toy/index.html');
});
app.get('/zoom-hammerjs/index.html', function(req, res){
  //send the index.html file for all requests
  res.sendFile(__dirname + '/zoom-hammerjs/index.html');
});


app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'common')));

http.listen(3001, function(){
  console.log('listening on *:3001');
});

var caress = new Caress('0.0.0.0', 3333, {json: true, debug: false});

io.on("connection", onSocketConnect);

function onSocketConnect(socket) {
    console.log("Socket.io Client Connected");

    caress.on('tuio', function(msg){
      socket.emit('tuio', msg);
    });

    socket.on("disconnect", function(){
      console.log("Socket.io Client Disconnected");
    });
}