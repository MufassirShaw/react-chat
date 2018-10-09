import {EventEmitter} from "events";
import firebase from "firebase/app";
import "firebase/database";
import {CONFIG} from "../firebaseConfig";

// this is not exactly a store as there are no actions coming in
//more of an abstract class used by the other two stores
class DBStore extends EventEmitter{
    constructor(){
        super();
        this._db = firebase.initializeApp(CONFIG).database().ref();
        
    }
    getDB=()=>{
        return this._db
    }



}




let dbstore = new DBStore();
export default dbstore;