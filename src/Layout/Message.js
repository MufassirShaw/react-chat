import React from 'react';
export default (props)=>{
    return (
        <div > 
            <strong className="user"> {props.msg.sender} </strong> <p className="msg">{props.msg.msgTxt}</p>      
        </div>
    );
}
