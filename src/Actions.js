import Dispatcher from "./dispatcher/Dispatcher";

export const signUp = (e)=>{
    
    Dispatcher.dispatch({
        "type" : "SIGN_UP",
        "user":{
            name: e.target.name.value,
            nickName: e.target.nickName.value,
            password: e.target.password.value,
        }
    })
}
export const signIn = (e)=>{

    Dispatcher.dispatch({
        "type": "SIGN_IN",
        "user":{
            name: e.target.name.value,
            password:e.target.password.value
        }
    })

}
