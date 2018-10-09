import Dispatcher from "./../dispatcher/Dispatcher";
import {SIGN_UP,SIGN_IN,LOGOUT,VERIFY_USER} from "./Types"
export const signUp = ({name,nickName,password})=>{
    Dispatcher.dispatch({
        "type" : SIGN_UP,
        "user":{
            name,
            nickName,
            password,
        } 
    })
}
export const signIn = ({name,password})=>{
    Dispatcher.dispatch({
        "type": SIGN_IN,
        "user":{
            name,
            password
        }
    })

}
export const verifyUser = ({name,nickName,password},callback) =>{ //this callback decides wether to signup or not
 Dispatcher.dispatch({
     "type": VERIFY_USER,
     user:{
         name,
         nickName,
         password
     },
     callback,

 })
}

export const logout = ()=>{
    Dispatcher.dispatch({
        "type":LOGOUT,
    });
}

export const selectChat =(chatInfo)=>{
    Dispatcher.dispatch({
        "type":"SELECT_CHAT",
        chatInfo:chatInfo
    })
}
