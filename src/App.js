import React,{Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import io from "socket.io-client";
import Main from "./Components/Layout/Main";
import Form from "./Components/Layout/Form";
import "./assests/custom.css";
import "typeface-roboto";
import AuthStore from "./store/AuthStore";
// import Users from './Components/Layout/Users';
// import {USER_CONNECTED} from "./Actions/Types";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();



    this.state = !(localStorage.getItem("id") 
                      && 
                  localStorage.getItem("nickName")) //if there is no user stored in local storage
      ?
    {
      nickName: null,
      id:null,
      socket: null,
    }
      :
    {
      nickName: localStorage.getItem("nickName"),
      id: localStorage.getItem("id"),
      socket: null,
    }; //maintaing user state

      let socket = io.connect(url);
      this.state.socket=socket; 
      /* if user refreshes or if user is already in local db and need no auth*/
      if(this.isUserStoredLocally()){
        let {nickName,socket} = this.state;
        // console.log(socket.id);
        socket.emit("USER_CONNECTED",{nickName:nickName, id:socket.id});
      }
  }  

  StoreUserLocally = (user)=>{
    localStorage.setItem("id" ,user.id);
    localStorage.setItem("nickName", user.nickName); 
  }

  isUserStoredLocally=()=>{
    return !(localStorage.getItem("id") && localStorage.getItem("nickName")) //if there is no user stored in local storag
            ?
          false 
            : 
          true;
  }

  
  logout = () =>{
    let {socket} = this.state;
    socket.emit("logout", {nickName:this.state.nickName, id:this.state.socket.id})
    localStorage.removeItem("id");
    localStorage.removeItem("nickName");
    this.setState({
      nickName: null,
      id:null,
    });
 }

    //socket io stuff
  initSocket=()=>{
  }


  componentDidMount() {
    AuthStore.on("logout",this.logout);

    AuthStore.on("VERIFIED",({nickName,id})=>{
      this.setState({nickName: nickName, id:id});
      // this.StoreUserLocally(this.state);
      let {socket} = this.state;
      socket.emit("USER_CONNECTED",{nickName:nickName});
    }); // User is Autherized Successfully e.g signIn loggedin signedUp
    
  }


  componentWillUnmount(){
    AuthStore.removeAllListeners("logout");
    AuthStore.removeAllListeners("VERIFIED");
  }

  render() {
    return (
      <Fragment>
        <CssBaseline/>
        <div className="App">
          {
            !this.state.nickName
              ?
            <Form socket={this.state.socket}/>
              :
            <Main 
              nickName={this.state.nickName}
              currentChat= {this.state.currentChat}
              socket={this.state.socket}
            />
          }
        </div>
      </Fragment>
    );
  }
}

export default App;
