import Dispatcher from "./../dispatcher/Dispatcher";
import {SIGN_UP,SIGN_IN,LOGOUT} from "./Types"
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
