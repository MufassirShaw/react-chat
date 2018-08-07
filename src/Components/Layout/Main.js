import React from 'react';
import MainChat from "./MainChat";
import Users from "./Users";
import Header from "./Header.js";
import {withStyles} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
const Styles = {
    container:{
        height:"100vh",
        alignContent:"flex-start",
        overflowY:"hidden"
    },
    ht1:{
        height:"8%",
        marginBottom: "2%"
    },
    ht9:{
        maxHeight:"90%",
        
    }
}

export default withStyles(Styles)(
    class Main extends React.Component{

        render(){
            const {nickName,classes} = this.props;
            return (
                <React.Fragment>
                    <Grid container className={classes.container}>
                        <Grid item className={classes.ht1} xs={12}>
                            <Header userName={nickName}/> 
                        </Grid>
        
                        <Grid item
                             xs={8} md={9}
                            className={classes.ht9}
                        >
                            <MainChat/>
                        </Grid>
                        <Grid item 
                             xs={4} md={3} 
                            className={classes.ht9}>
                            <Users/>
                        </Grid>
                    </Grid>  
                </React.Fragment>
            );
        }
    }
);