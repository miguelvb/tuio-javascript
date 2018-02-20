
var socket = io();

socket.on('message', function(msg){
  document.getElementById("message").innerHTML = msg;
});

socket.on('tuio', function(msg){
  document.getElementById("message").innerHTML = JSON.stringify(msg);
});