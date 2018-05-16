var app = require('express')();  //init express lib
var http = require('http'); 	// http module of node 
var server = http.Server(app); // making a server
var io = require("socket.io")(server); // passing the server to the instance of socket.io


//var path = require("path");
app.get('/', function(req, res){  // telling the server to render the following folder on localhost:PORT/
  // res.sendFile( path.join(`${__dirname}/../../public/index.html`));
  // document.write("working app");
  // console.log("working app");
});

io.on("connection",function(socket){

  socket.on("msgTyped",(data)=>{
    io.sockets.emit("newMsg",data);
    // console.log(data);
    socket.broadcast.emit("secretMsg",{data})
  });
 //all i need to do now is to boradcast this msg n recive it on client

});


server.listen(8000, function(){
  console.log('listening on *:8000');
});