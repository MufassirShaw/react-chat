import {EventEmitter} from "events";
import Dispatcher from "../dispatcher/Dispatcher";
import passwordHash from "password-hash";
import DBStore from "./DBStore"
import {SIGN_IN,SIGN_UP,LOGOUT,VERIFY_USER} from "../Actions/Types";
class AuthStore extends EventEmitter{
    constructor() {
        super();
        this._db = DBStore.getDB(); 
        this._user = {
            nickName:null,
            id: null
        } 
    }
    
    login = (user)=>{
        this._db.child("users").once('value')
        .then((snapshot)=>{
            let data =  snapshot.val();
             if(!data) {    
             return false;  //if there isn't any data just return false form here
             }
            let keys  = Object.keys(data),
                userId =  keys.find((key)=>{
                   let nameFound = data[key].name === user.name,
                    passwordFound = passwordHash.verify(user.password , data[key].password);
                    return nameFound && passwordFound ? key : false;  //if user is found return his/her id else false
                });
                return (userId ? {id: userId, nickName: data[userId].nickName} : false   );

        })
        .then((data)=>{
            let {id,nickName} = data;
            if(id){ 
                this._user = {
                    nickName,
                    id
                }
                this.emit("VERIFIED", this.getUser())
            } else{
                this.emit("userNotFound");
            }           
        })
        .catch((e)=>{
            console.error("Oops! something bad happened",e);
        })

    }
    
    signUp =(user)=>{
        user.password = passwordHash.generate(user.password);
        this._db.child("users").push(user).then((data)=>{
            let id = data.key,
                nickName= user.nickName;
                this._user = {
                    nickName,
                    id
                };
            this.emit("VERIFIED",this.getUser());
        })       
        //can and may should add the feature of unique user name 

        // push the user to firebase _db and let the consumer components know that
    }

    logout = ()=>{        
        this.emit("logout");        // this event is for the view component to listen to
    }

    getUser = ()=>{
        return this._user;
    }

    verify = (user, callback)=>{
        this._db.child("users").once('value').then((snapshot)=>{
            let data =  snapshot.val();
            if(!data) { 
                callback(false,user);   
                return ;  //if there isn't any data just return false form here
            }
            let keys  = Object.keys(data),
                found =  keys.find((key)=>{
                   let userFound = data[key].nickName.toUpperCase() === user.nickName.toUpperCase();
                   return (userFound !== false || undefined ? userFound : false);    
            });
            if(!found){
                callback(false, user); //user doesn't exists already
            }else{
                callback(true,null); //user exists
            }
           
        });
      
    }

    
    handleAction=(action)=>{
        switch(action.type){
            case SIGN_UP:
            this.signUp(action.user)
            break;
            case SIGN_IN:
            this.login(action.user);
            break;
            case LOGOUT:
            this.logout()
            break;
            case VERIFY_USER:
            this.verify(action.user, action.callback);
            break;
            default:
            // console.log("defualt action");
        }
    }
}

let authstore = new AuthStore();
Dispatcher.register(authstore.handleAction);
export default authstore;