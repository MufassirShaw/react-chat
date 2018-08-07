import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Avatar from '@material-ui/core/Avatar';
import {withStyles} from "@material-ui/core/styles";
import { Icon } from "@material-ui/core";
import {logout} from "./../../Actions";
const Styles = {
  toolBar: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "space-between"
  },
  link:{
    textDecoration: "none",
    color: "#fff",
    fontWeight: "400",
    fontSize: "22px",
  }
};
const Header = (props)=>{
   const {classes,userName} = props;
    return (
      <div>
        <AppBar position="static" >
          <Toolbar className={classes.toolBar}>
            <Typography variant="title" color="inherit">
              {userName?userName:"defualt"}'s Chats
            </Typography>
            <Typography 
                className={classes.link} 
                variant="headline" 
                component="a" 
                href="#"
                onClick={logout}
                > 
                Logout 
             
                <i className="logout"> </i>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
export default withStyles(Styles)(Header);