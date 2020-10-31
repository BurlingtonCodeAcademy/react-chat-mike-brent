import React, { useEffect, useState } from "react";

import "./rooms.css";

export default function Room() {
    const [messages, setMessages] = useState([]);


    useEffect(() => {

        fetch('/room/one').then((res) => {
            return res.json();

        }).then((res) => { setMessages(res) })

    }, [])

    let messageDiv = messages.map((message) => {
        return <div>{message.date} {message.author} {message.body}</div>;
    });


    return (
        <div id="top-container">
            <div id="post-box">{messageDiv}</div>
            <div id="selector-box">selector buttons
               
            <button type="submit" >Refresh</button>
            </div>
        </div>
    )
}


