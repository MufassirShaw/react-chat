import React from 'react';
import {withStyles} from "@material-ui/core/styles";

const Styles = {
    border:{
        height:"100%",
    }
}

export default withStyles(Styles)(
    class MainChat extends React.Component{
        render(){
            const {classes}= this.props;
            return (
                <React.Fragment>
                    <div className={classes.border}>
                     </div>
        
                </React.Fragment>
            );
        }
})

