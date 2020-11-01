import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Room from "./components/Room.js";
import RoomSelector from "./components/RoomSelector.js";

function App() {
  const [room, setRoom] = useState("one");
  const authorInputRef = useRef(null);
  const contentInputRef = useRef(null);
  // hook for user name
  // hook for room selected - room 'state'
  const onSubmitHandler = (evt) => {
    console.log(authorInputRef);
    console.log(contentInputRef);
    console.log("submitted");
    evt.preventDefault();
    fetch(`/room/${room}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        post: {
          author: authorInputRef.current.value,
          content: contentInputRef.current.value,
        },
      }),
    });
  };
  async function refreshHandler(event) {
    // await fetch(`/room/${room}`).then((res) => {
    //     return res.json();
    // }).then((res) => {
    //     if (messages !== res) {
    //         setMessages(res)
    //     }
    // })
  }
  return (
    <div id="main-container">
      <h1>Chat o Rama</h1>
      <Room room={room} />
      <RoomSelector setRoom={setRoom} />
      <br />
      <div id="bottom-container">
        <form onSubmit={onSubmitHandler}>
          <label for="post-author">Author</label>
          <input ref={authorInputRef} type="text" id="post-author"></input>
          <label for="post-content">Content</label>
          <input ref={contentInputRef} type="text" id="post-content"></input>
          <div id="button-box">
            <input type="submit"></input>
          </div>
        </form>
        <button type="submit" onClick={refreshHandler}>
          Refresh
        </button>
      </div>
    </div>
  );
}

export default App;
