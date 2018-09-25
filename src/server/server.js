var app = require('express')();  //init express lib
var http = require('http'); 	// http module of node 
var server = http.Server(app); // making a server
var io = require("socket.io")(server); // passing the server to the instance of socket.io
var users = [];
app.get('/', function(req, res){  
});

io.on("connection",function(socket){
  console.log(socket.id);
  socket.on("USER_CONNECTED",(user)=>{
    console.log(user);
  })
 socket.on('disconnect', function () {
   console.log("disconnected ", socket.id)
});

});



server.listen(8000, function(){
  console.log('listening on *:8000');
});