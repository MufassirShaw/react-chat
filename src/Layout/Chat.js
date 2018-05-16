import React, { Component } from 'react';
import Message from "./Message";
class Chat extends Component {
    constructor(){
        super();

        this.state = {
            msgs: [
                {
                    sender: "",
                    msgTxt: ""
                }
            ],
        }
    }
    componentWillMount() {
        this.newMsgHandler();
        this.handleSecreteMsg();
    }
    handleSecreteMsg(){
        const {socket} = this.props;
        socket.on("secretMsg",(data)=>{
            console.log(data);

        });

    }
    handleChange = (e) => {
        //this handler will be of help to keep track of who is typing
    }
    handleSubmit = (e) =>{
        const {socket,user} = this.props;
        e.preventDefault();
        socket.emit("msgTyped" , {msgTxt: e.target.msgInput.value, sender : user});
        e.target.msgInput.value = "";
    }
    newMsgHandler =() =>{
        const {socket} = this.props;
        socket.on("newMsg",(data)=>{
            this.setState((state)=>{
                return state.msgs.push(data);
            });
        });
    }


    render() {
        return (
            <div className="appContainer">
                <h1 className="chatHeading p-2 text-center"> Chit Chat App </h1>
                <div className="chatContainer ">
                    <div className="msgPane">
                        <div className="msgs">
                            <h4> 
                                {
                                    this.state.msgs.map((msg,i)=>{
                                        // console.log(msg);
                                        return msg.sender!=="" && msg.msgTxt !==" " ? <Message key={i} msg ={msg}/> :false
                                    })
                                }
                            </h4>
                        </div>

                        <div className="feedback"></div>
                    </div>
                    <form onSubmit={this.handleSubmit} className="row fixed-bottom">
                        <div className="col-sm-1"></div>
                        <input type="text" name="msgInput" required onChange={this.handleChange} className="form-control col-md-9 col-sm-8" placeholder="Say something..."  />
                        <input type="submit"  className="btn snd-btn app-btn col-md-1 col-sm-2" value=""/>
                        <div className="col-sm-1"></div>
                    </form>
                </div>

            </div>
        );
    }
}

export default Chat;
