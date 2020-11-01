import React, { useEffect, useState } from "react";

import "./rooms.css";

export default function Room() {
    const [messages, setMessages] = useState([]);
    const [room, setRoom] = useState('one')


    useEffect(() => {
        fetch(`/room/${room}`).then((res) => {
            return res.json();
        }).then((res) => {
            if (messages !== res) {
                setMessages(res)
            }
        })
    })

    async function refreshHandler(event) {
        await fetch(`/room/${room}`).then((res) => {
            return res.json();
        }).then((res) => {
            if (messages !== res) {
                setMessages(res)
            }
        })
    }

    function roomOneHandler(event) {
        event.preventDefault()
        if (room !== 'one') {
            setRoom('one')
            refreshHandler()
        }
    }

    function roomTwoHandler(event) {
        event.preventDefault()
        if (room !== 'two') {
            setRoom('two')
            refreshHandler()
        }
    }



    let messageDiv = messages.map((message) => {
        return <li key={message._id}>{message.date} {message.author} {message.body}</li>;
    });


    return (
        <div id="top-container">
            <div id="post-box">{messageDiv}</div>
            <div id="selector-box">
                <button type='submit' onClick={roomOneHandler} >Room One</button>
                <button type='submit' onClick={roomTwoHandler} >Room Two</button>
                <button type="submit" onClick={refreshHandler} >Refresh</button>
            </div>
        </div>
    )
}


