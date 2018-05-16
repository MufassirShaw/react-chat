import React from 'react';
import io from "socket.io-client";
import Form from "./Layout/Form";
import Chat from "./Layout/Chat";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assests/custom.css";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      socket: null,
      user: {
        name: ""
      }
    };
 

  }
  componentDidMount() {
    this.initSocket();
  }

  initSocket = ()=>{
    const socket = io.connect(url); //init the io connection for a particular url i.e the url where server is located 
    socket.on("connect",()=>{
      //this is where we get that pipe to talk to and listen to the server which is "socket"
      this.setState({socket: socket });
    });
  }

  setUpUser=  (user) =>{
    this.setState({
        user: user.name,
    });

}

  render() {

    return (
      <div className="App">
        <div className="appContainer"> 
        {
          this.state.user.name ==="" ?<Form setUser = {this.setUpUser}/> 
          : <Chat user= {this.state.user }  socket= {this.state.socket}/> 
        }
        </div>
      </div>
    );
  }
}

export default App;
