var app = require('express')();  //init express lib
var http = require('http'); 	// http module of node 
var server = http.Server(app); // making a server
var io = require("socket.io")(server); // passing the server to the instance of socket.io
var connUsers = [];
app.get('/', function(req, res){  
});

io.on("connection",function(socket){

  socket.on("USER_CONNECTED", ({nickName})=>{
    let user = {nickName: nickName, id:socket.id};
    connUsers.push(user);   
    console.log(nickName + " got connected");
    io.sockets.emit("NEW_USER_ADDED",connUsers);
  })
 
 socket.on('disconnect', function () {
   let newUsers = connUsers.filter(user=>(user.id!==socket.id))
    connUsers = newUsers;
    console.log(connUsers);
  });

  socket.on("logout",({id})=>{
    let newUsers = connUsers.filter(user=>(user.id!==id))
    connUsers = newUsers;
    console.log(connUsers);

})

});


server.listen(8000, function(){
  console.log('listening on *:8000');
});

