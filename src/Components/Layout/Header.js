import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';


class MenuAppBar extends React.Component {
    constructor(props){
        super();
           this.userName = props.userName ;
      }
   
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {this.userName}'s Chats
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default (props)=>{
    const userName = props.userName
  return (<MenuAppBar userName = {userName}/>);
}