import React,{Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import io from "socket.io-client";
import Header from "./Components/Layout/Header";
import {Form} from "./Components/Layout/Form";
import "./assests/custom.css";
import "typeface-roboto";
import Store from "./store/Store";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();
    this.state = {
      nickName: null 
    }

  }
  componentWillMount() {
    Store.on("registered",(nickName)=>{
      this.setState({nickName});
    })
    //  console.log(Store);
  }
  render() {

    return (
      <Fragment>
        <CssBaseline/>
        <div className="App">
        {  !this.state.nickName?
          <Form/>
          :<Header userName={this.state.nickName}/>
        }
        
        </div>
      </Fragment>
    );
  }
}

export default App;
