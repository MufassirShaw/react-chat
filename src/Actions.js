import Dispatcher from "./dispatcher/Dispatcher";
export const signUp = (e)=>{
    Dispatcher.dispatch({
        "type" : "SIGN_UP",
        "user":{
            name: e.target.name.value.toUpperCase(),
            nickName: e.target.nickName.value,
            password: e.target.password.value,
        } 
    })
    e.target.name.value = "";
    e.target.nickName.value="";
    e.target.password.value = "";
}
export const signIn = (e)=>{
    Dispatcher.dispatch({
        "type": "SIGN_IN",
        "user":{
            name: e.target.name.value.toUpperCase(),
            password:e.target.password.value
        }
    })



}

export const logout = () =>{
    Dispatcher.dispatch({
        "type":"LOGOUT"
    });
}
