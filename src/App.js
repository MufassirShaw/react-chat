import React,{Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import io from "socket.io-client";
import Main from "./Components/Layout/Main";
import Form from "./Components/Layout/Form";
import "./assests/custom.css";
import "typeface-roboto";
import Store from "./store/Store";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();
    this.state = !(localStorage.getItem("id") && localStorage.getItem("nickName")) //if there is no user stored in local storeage
      ?
    {
      nickName: null,
      id:null 
    }
      :
    {
      nickName: localStorage.getItem("nickName"),
      id: localStorage.getItem("id")
    }; //maintaing user state
  
  }
  componentDidMount() {

    Store.on("registered",({nickName,id})=>{
      this.setState({nickName: nickName, id:id});
      this.StoreUserLocally(this.state);
    }); //signed Up Successfully 
    
    
    Store.on("userFound",({nickName, id})=>{
      this.setState({
          nickName: nickName,
          id:id
        });  

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
      id:null 
    });
 }

  // componentWillUnmount(){
  //   Store.removeAllListeners();
  // }

  render() {

    return (
      <Fragment>
        <CssBaseline/>
        <div className="App">
        {  !this.state.nickName?
          <Form/>
          : <Main nickName={this.state.nickName}/>
        }
        
        </div>
      </Fragment>
    );
  }
}

export default App;
