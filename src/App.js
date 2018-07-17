import React,{Fragment} from 'react';
import CssBaseline from '@material-ui/core/CssBaseline'
import io from "socket.io-client";
import Header from "./Components/Layout/Header";
import {Form} from "./Components/Layout/Form";
import "./assests/custom.css";
import "typeface-roboto";
const url = "http://localhost:8000/"; // This is the url where our server is setup
class App extends React.Component {
  constructor(){
    super();

  }
  componentDidMount() {
  }

  render() {

    return (
      <Fragment>
        <CssBaseline/>
        <div className="App">
            <Form/>
        </div>
      </Fragment>
    );
  }
}

export default App;
