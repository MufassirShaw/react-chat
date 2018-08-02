import {EventEmitter} from "events";
import * as Action from "../Actions";
import Dispatcher from "../dispatcher/Dispatcher";
import firebase from "firebase/app";
import "firebase/database";
import bcrpt from "bcrypt";
import {CONFIG} from "../firebaseConfig";
class Store extends EventEmitter{
    constructor(){
        super();

        this.app = firebase.initializeApp(CONFIG);
        this.db =  this.app.database().ref();
    }
    login = (user) =>{
        console.log("will do all the login logic here",user)
    }
    signUp =(user)=>{
        this.db.child("users").push({user},()=>{
            this.emit("registered",user.nickName);
        }); // push the user to firebase db and let the consumer components know that
        //set some user sessions so that the user stay logged in
        
    }
    handleAction=(action)=>{
        switch(action.type){
            case "SIGN_UP":
            this.signUp(action.user)
            break;
            case "SIGN_IN":
            this.login(action.user);
            break;
        }
    }

}




let store = new Store();
Dispatcher.register(store.handleAction)
export default store;