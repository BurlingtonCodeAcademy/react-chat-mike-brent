import React, {useState } from "react";



export default function RoomSelector({setRoom}) {
    function roomOneHandler(event) {
        event.preventDefault()
        setRoom('one');
    }

    function roomTwoHandler(event) {
        event.preventDefault()
        setRoom('two');
    }

    return (
        <div id="selector-box">
            <button type='submit' onClick={roomOneHandler} >Room One</button>
            <button type='submit' onClick={roomTwoHandler} >Room Two</button>
        </div>
    )
}


