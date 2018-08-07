import React from 'react';
import {withStyles} from "@material-ui/core/styles";


const Styles = {
    chatContainer:{
        height:"100%",
        width:"100%",
        display:"flex",
        flexDirection:"column",
    },
    form:{
        height:"10%",
        width:"90%",
        border:"solid",
        margin:"0 auto"
    }

}

export default withStyles(Styles)(
    class MainChat extends React.Component{
        render(){
            const {classes}= this.props;
            return (
                <React.Fragment>
                    <div className={classes.chatContainer}>
                        <div className= "currentChat"> 
                            currentChat
                        </div>

                        <form className={classes.form}> 
                            <h1>send message</h1>
                        </form>

                     </div>
        
                </React.Fragment>
            );
        }
})

