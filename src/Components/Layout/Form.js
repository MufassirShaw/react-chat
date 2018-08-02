import React, { Component, Fragment} from "react";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from "@material-ui/core/Paper";
import Avatar from '@material-ui/core/Avatar';
import {signIn, signUp} from "../../Actions";
//the only component exported from this module
export class Form extends Component{
    constructor(){
        super();
        this.state = {
            isReg: false
        }
    }
    render(){
        return(
            <Fragment>
                <Modal 
                    open= {true}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                >                     
                    <Slide in direction="down" mountOnEnter unmountOnExit>
                        
                        <Paper className="form" elevation={10}>
                        {   
                            this.state.isReg 
                            ? 
                            <LoginForm  />
                            :
                            <SignUpForm />
                        }    
                            <Typography 
                                variant="subheading"
                                className="link" 
                                color="primary" 
                                onClick= {()=>{this.setState({isReg: !this.state.isReg})}}
                                href="#" 
                                component="a" 
                                gutterBottom>
                                Or {this.state.isReg?" Signup" : " Sign In"} 
                            </Typography>           
                        </Paper>
                    </Slide>
                </Modal>
            </Fragment>
        );
    }
}
 
 const SignUpForm = (props)=>{
    return (
        <Fragment> 
                <div>
                    <Grid container component='form' 
                        onSubmit={(e)=>{ e.preventDefault(); signUp(e);}} 
                        spacing={16} 
                    >
                        <Grid item xs={3}> </Grid>
                        <Grid item component='div' className='avatarContainer' xs={6} >
                            <Typography 
                                variant="display2"
                                align="center" 
                                color="primary"
                                gutterBottom
                                >SignUp Here</Typography>
                            <div
                                className="avatar"  
                            ></div>


                        </Grid>
                        <Grid item xs={3}> </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                required
                                placeholder="User name.."
                                label="Name"
                                id="name"
                                name="name"
                            /> 
                        </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                required
                                placeholder="What Should We Call You..."
                                label="Nick Name"
                                id="nick name"
                                name="nickName"
                            /> 
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                                fullWidth
                                required
                                placeholder="Password.."
                                label="Password"
                                id="password"
                                type="password"
                                name="password"
                            /> 
                        </Grid>
                        <Grid item xs={12}>
                            <Button  
                                className="btn"
                                type="submit" 
                                variant="contained" 
                                color="primary"
                                fullWidth
                                >
                                Submit 
                            </Button> 
                        </Grid>
                        
                    </Grid>                    
                
                </div>

        </Fragment>
    );

}


const LoginForm = ()=>{
    return (
        <Fragment> 
                <div className="loginForm">
                    <Grid container component='form' onSubmit={(e)=>{ e.preventDefault(); signIn(e);}} justify="center" spacing={16} >
                        <Grid item xs={3}> </Grid>
                        <Grid item component='div' className='avatarContainer' xs={6} >
                            <Typography 
                                variant="display2"
                                align="center" 
                                color="primary"
                                gutterBottom
                                >Login Here</Typography>
                            <div
                                className="avatar"  
                            ></div>


                        </Grid>
                        <Grid item xs={3}> </Grid>
                        <Grid item xs={12}>
                            <TextField 
                                fullWidth
                                required
                                placeholder="User name.."
                                label="Name"
                                id="name"
                                name="name"
                            /> 
                        </Grid>
                        <Grid xs={12} item>
                            <TextField 
                                fullWidth
                                required
                                placeholder="Password.."
                                label="Password"
                                id="password"
                                type="password"
                                name="password"
                            /> 
                        </Grid>
                        <Grid item xs={12} >
                            <Button 
                                className="btn" 
                                type="submit" 
                                fullWidth 
                                variant="contained" 
                                color="primary">
                                Submit 
                            </Button> 
                        </Grid>
                        
                    </Grid>                    
                
                </div>

        </Fragment>
    );

}

