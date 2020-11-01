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
        console.log('refreshed')
        await fetch(`/room/${room}`).then((res) => {
            return res.json();
        }).then((res) => {
            if (messages !== res) {
                setMessages(res)
            }
        })
    }

    function roomOneHandler(event) {
        if (room !== 'one') {
            setRoom('one')
            refreshHandler()
            console.log(room)
        }
    }

    function roomTwoHandler(event) {
        if (room !== 'two') {
            setRoom('two')
            refreshHandler()
            console.log(room)
        }
    }



    let messageDiv = messages.map((message) => {

        
        return <div>{message.date} {message.author} {message.body}</div>;
    });


    return (
        <div id="top-container">
            <div id="post-box">{messageDiv}</div>
            <div id="selector-box">
                <button type='radio' onClick={roomOneHandler} >Room One</button>
                <button type='radio' onClick={roomTwoHandler} >Room Two</button>
                <button type="submit" onClick={refreshHandler} >Refresh</button>
            </div>
        </div>
    )
}


