import {EventEmitter} from "events";
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
        this.currentChat = {
        };
        this.currentThread=[]
        
    }


    login = (user)=>{
        this.db.child("users").once('value')
        .then((snapshot)=>{
            let data =  snapshot.val();
             if(!data)
             return false;  //if there isn't any data just return false form here


            let keys  = Object.keys(data),
                userId =  keys.find((key)=>{
                   let nameFound = data[key].name === user.name,
                    passwordFound = passwordHash.verify(user.password , data[key].password);
                    return nameFound && passwordFound ? key : false;  //if user is found return his/her id else false
                });
                return (userId ? {id: userId, nickName: data[userId].nickName} : false );

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
            console.error("Oops! something bad happened",e);
        })

    }
    
    signUp =(user)=>{
        user.password = passwordHash.generate(user.password);
        this.db.child("users").push(user).then((data)=>{
            let id = data.key,
                nickName= user.nickName
            this.emit("registered",{nickName: nickName, id:id});

        })       
        //can and may should add the feature of unique user name 

        // push the user to firebase db and let the consumer components know that
    }

    logout = ()=>{
        this.emit("logout");        // this event is for the view component to listen to

    }

    // loadThread = (url)=>{
    //     //here make call to the firebase api and load the chat thread into this.currentThread 
    //     //when thats done call selecChat method
    // }


    // selectChat=(chatInfo)=>{
    // !chatExists ? createNewChat :
    //     this.loadThread().then(()=>{
    //     // this.currentChat = {
    //     //     chatName: chatInfo.chatName,
    //     //     chatId: chatInfo.chatId,
    //     //     thread: this.currentThread
    //     // }
    //         this.emit("loadChat",this.currentChat)
    //     })


    
    // }

    selectChat = (chatInfo)=>{
       this.emit("loadChat",
        {
            chatName:chatInfo.chatName,
            chatId:chatInfo.chatId,
            thread:this.currentThread
        });
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
            case "SELECT_CHAT":
            this.selectChat(action.chatInfo)
            break;
            default:
            // console.log("defualt action");
        }
    }

}




let store = new Store();
Dispatcher.register(store.handleAction)
export default store;