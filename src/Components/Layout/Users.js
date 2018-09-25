import React from 'react';
import {withStyles} from "@material-ui/core/styles";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from "@material-ui/core/Avatar";
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import {selectChat} from "./../../Actions/Actions";
const Styles = {
    userContainer:{
        height:"100%",
        overflow:"hidden"
    },
    usersList:{
        overflowY:"auto",
        maxHeight:"80%",
        '&::-webkit-scrollbar-track':{
            boxShadow: "inset 0 0 6px  rgba(0,0,0,0.3)",
            borderRadius: "20px",
            backgroundColor: "#ccc",
        },
        '&::-webkit-scrollbar':{
            width: "12px",
            backgroundColor: "#ccc",
        },
        '&::-webkit-scrollbar-thumb':{
            borderRaduis: "20px",
            backgroundColor: "#f5f5f5",
            backgroundImage: `-webkit-gradient(linear,
                left bottom,
                left top,
                color-stop(0.44, rgb(122,153,217)),
                color-stop(0.72, rgb(73,125,189)),
                color-stop(0.86, rgb(28,58,148)));
            `,
            borderRadius:"20px"
        }
    }
}

export default withStyles(Styles)(
    class Users extends React.Component{
        constructor(){
            super();
            this.state = {
                users:[
                    {
                        "id": "5b6a94a8a287cc9840991bb1",
                        "name": "Community"
                      },
                      {
                        "id": "5b6a94a873a7afa9c417dc04",
                        "name": "Margery"
                      },
                      {
                        "id": "5b6a94a8751d2217ca293413",
                        "name": "Hodges"
                      },
                      {
                        "id": "5b6a94a85648257cf587a7ca",
                        "name": "Vincent"
                      },
                      {
                        "id": "5b6a94a8921b055d9632c266",
                        "name": "Maritza"
                      },
                      {
                        "id": "5b6a94a899ac5436011dddda",
                        "name": "Theresa"
                      },
                      {
                        "id": "5b6a94a8f291eae6278f978f",
                        "name": "Cathleen"
                      },
                      {
                        "id": "5b6a94a8c2b7bb535181206b",
                        "name": "Aguirre"
                      },
                      {
                        "id": "5b6a94a891b3342295533198",
                        "name": "Adkins"
                      },
                      {
                        "id": "5b6a94a884823a08ca764873",
                        "name": "Guzman"
                      },
                      {
                        "id": "5b6a94a8c797ee57d2c12913",
                        "name": "Beatrice"
                      },
                      {
                        "id": "5b6a94a88084c0204a1825c9",
                        "name": "Key"
                      },
                      {
                        "id": "5b6a94a88024d33c35691282",
                        "name": "Laurel"
                      },
                      {
                        "id": "5b6a94a816f69ed40c009bcd",
                        "name": "Walton"
                      },
                      {
                        "id": "5b6a94a8449aac3feb6f7b84",
                        "name": "Polly"
                      },
                      {
                        "id": "5b6a94a83bb07c9eb9d46900",
                        "name": "Muf"
                      },                
                    
                    ]
            
            }
        }
        

    render(){
        const {classes} = this.props;
        return (
            <React.Fragment>
                <Paper elevation={8}
                    classes={
                        {
                            root: classes.userContainer,
                        }
                    }
                >
                    <Typography variant="display1" align="center" style={{paddingTop:"10px"}} gutterBottom > Users </Typography>
                    <List  component="nav" className={classes.usersList} >
                        {
                            this.state.users.map((user)=>{
                                return <User user={user} selectChat={selectChat} key={user.id}/>;
                            })
                        }
                    </List>
                </Paper>
            </React.Fragment>
        );
    }
})




const User =(props)=>{
    const {user,selectChat} = props;
    return(

        <React.Fragment>
            <ListItem 
                button 
                onClick={
                    (e)=>{
                        selectChat({
                                chatId:`${user.id}+ ${localStorage.getItem("id")}`,
                                chatName:user.name // the name of the reciver n btw this should be nickName not name
                        });
                    }
                }     
            >
                <ListItemAvatar >
                    <Avatar  src={`https://api.adorable.io/avatars/89/${user.id}@adorable.io.png`}/>
                </ListItemAvatar>
                <ListItemText
                    primary={user.name}
                />
            </ListItem>
            <Divider inset/>
        </React.Fragment>
    );

}