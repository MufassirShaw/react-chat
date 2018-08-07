import {EventEmitter} from "events";
import * as Action from "../Actions";
import Dispatcher from "../dispatcher/Dispatcher";
import firebase from "firebase/app";
import "firebase/database";
import {CONFIG} from "../firebaseConfig";
import passwordHash from "password-hash";
class Store extends EventEmitter{
    constructor(){
        super();
        this.app = firebase.initializeApp(CONFIG);
        this.db =  this.app.database().ref();
    }


    login = (user)=>{
        this.db.child("users").once('value')
        .then((snapshot)=>{
            let data =  snapshot.val(),
                keys  = Object.keys(data),
                userId =  keys.find((key)=>{
                   let nameFound = data[key].user.name === user.name,
                    passwordFound = passwordHash.verify(user.password , data[key].user.password);
                    return nameFound && passwordFound ? key : false;  //if user is found return his/her id else false
                });
                return (userId ? {id: userId, nickName: data[userId].user.nickName} : false );

        })
        .then((data)=>{
            let {id,nickName} = data;
            id 
            ?
            this.emit("userFound", {nickName:nickName , id:id})
            : 
            this.emit("userNotFound");
        })
        .catch((e)=>{
            console.log("Oops! something bad happened",e);
        })

    }
    
    signUp =(user)=>{
        user.password = passwordHash.generate(user.password);
        this.db.child("users").push({user}).then((data)=>{
            let id = data.key,
                nickName= user.nickName
            this.emit("registered",{nickName: nickName, id:id});

        })       
        //can and may should add the feature of unique user name 

        // push the user to firebase db and let the consumer components know that
    }

    logout = ()=>{
        this.emit("logout");
    }




    handleAction=(action)=>{
        switch(action.type){
            case "SIGN_UP":
            this.signUp(action.user)
            break;
            case "SIGN_IN":
            this.login(action.user);
            break;
            case "LOGOUT":
            this.logout()
            break;
        }
    }

}




let store = new Store();
Dispatcher.register(store.handleAction)
export default store;