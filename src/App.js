import React,{Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import io from "socket.io-client";
import Main from "./Components/Layout/Main";
import Form from "./Components/Layout/Form";
import "./assests/custom.css";
import "typeface-roboto";
import Store from "./store/Store";
import {USER_CONNECTED} from "./Actions/Types";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();
    this.state = !(localStorage.getItem("id") 
                      && 
                  localStorage.getItem("nickName")) //if there is no user stored in local storeage
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

  }

//DANGEROUS use this life cycle hook should be AVOIDED
  // componentWillMount() {
  //   this.initSocket();

  // }
  componentDidMount() {
      
    // NOTE THIS SHOULD BE REMOVED
    // this.initSocket();

    Store.on("registered",({nickName,id})=>{
      this.setState({nickName: nickName, id:id});
      this.initSocket();
      this.StoreUserLocally(this.state);
    }); //signed Up Successfully 
    
    
    Store.on("userFound",({nickName, id})=>{
      this.setState({
          nickName: nickName,
          id:id
        });  
        this.initSocket();
        this.StoreUserLocally(this.state);
    }); //Logged In Successfully

    Store.on("logout",this.logout);

  }

  StoreUserLocally = (user)=>{
    localStorage.setItem("id" ,user.id);
    localStorage.setItem("nickName", user.nickName);
  }


  logout = () =>{
    localStorage.removeItem("id");
    localStorage.removeItem("nickName");
    this.setState({
      nickName: null,
      id:null,
      socket: null
    });
 }

    //socket io stuff
  initSocket=()=>{
    let socket = io.connect(url),
        {nickName,id}=this.state;
    this.setState({socket});
    socket.on("connect",()=>{
      socket.emit(USER_CONNECTED,{nickName,id});
      console.log(socket.id);
  
    })
  }



  componentWillUnmount(){
    Store.removeAllListeners();
  }





  

  render() {

    return (
      <Fragment>
        <CssBaseline/>
        <div className="App">
          {
            !this.state.nickName
              ?
            <Form/>
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
