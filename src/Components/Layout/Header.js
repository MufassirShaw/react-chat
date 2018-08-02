import React from "react";
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

const Header = ({userName})=>{
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              {userName}'s Chats
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
export default Header;