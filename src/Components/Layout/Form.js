import React, { Component, Fragment} from "react";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';
//the only component exported from this module
export class Form extends Component{
    constructor(){
        super();
 
        this.state = {
             user: {
             name: null,
             password:null,
             nickName: null
             },
             modalState: true,
             slideState: true
        
         };
    }
    handleSubmit = (e)=>{
        console.log(e);
        e.preventDefualt();
    }

    
    render(){
        return(
            <Fragment>
                <Modal 
                open={this.state.modalState}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >                     
                    <Slide in={this.state.slideState} direction="down" mountOnEnter unmountOnExit>
                        
                        <Paper className="form" elevation={10}>
                            <LoginForm handleSubmit={this.handleSubmit} />
                        </Paper>
                    </Slide>
                </Modal>
             </Fragment>
        );
    }
 
 }

const SignupForm =(props)=>{
    return (
        <Fragment> 
            <Grid container component='form' onSubmit={props.handleSubmit} justify="center" spacing={16} >
                <Grid item xs={3}> </Grid>
                <Grid item className='' xs={6} >
                    <Typography 
                        variant="display2"
                        align="center" 
                        color="primary"
                        gutterBottom
                        >Sign Up Here</Typography>
                    <Avatar
                        className="avatar"  
                        gutterBottom
                        component="img"
                        alt="avatar"
                     />

                </Grid>
                <Grid item xs={3}> </Grid>
                <Grid item xs={12}>
                    <TextField 
                        fullWidth
                        required
                        placeholder="User name.."
                        label="Name"
                        id="name"
                    /> 
                </Grid>
                <Grid xs={12} item >
                    <TextField 
                        fullWidth
                        required
                        placeholder="Password.."
                        label="Password"
                        id="name"
                    /> 
                </Grid>
                <Grid item xs={12} >
                    <Button  className="btn" gutterBottom type="submit" variant="contained" color="primary">
                        Submit 
                    </Button> 
                </Grid>
                
            </Grid>                    
        </Fragment>
    );

}


const LoginForm = (props)=>{
    return (
        <Fragment> 
                <div className="loginForm">
                    <Grid container component='form' onSubmit={props.handleSubmit} justify="center" spacing={16} >
                        <Grid item xs={3}> </Grid>
                        <Grid item component='div' className='avatarContainer' xs={6} >
                            <Typography 
                                variant="display2"
                                align="center" 
                                color="primary"
                                gutterBottom
                                >Login Here</Typography>
                            <img
                                className="avatar"  
                                gutterBottom
                            />

                        </Grid>
                        <Grid item xs={3}> </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                required
                                placeholder="User name.."
                                label="Name"
                                id="name"
                            /> 
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                                fullWidth
                                required
                                placeholder="Password.."
                                label="Password"
                                id="name"
                            /> 
                        </Grid>
                        <Grid item xs={12} >
                            <Button  className="btn" type="submit" variant="contained" color="primary">
                                Submit 
                            </Button> 
                        </Grid>
                        
                    </Grid>                    
                
                </div>

        </Fragment>
    );

}

