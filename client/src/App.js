import React, { useState, useRef } from "react";
import "./App.css";
import Room from "./components/Room.js";
import RoomSelector from "./components/RoomSelector.js";

function App() {
   // hook for room selected - room 'state'
   const [room, setRoom] = useState("one");

   const authorInputRef = useRef(null);
   const contentInputRef = useRef(null);

   // form submit handler
   const onSubmitHandler = (evt) => {
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
      await fetch(`/room/${room}`).then((res) => {
         return res.json();
      }).then((res) => {
         //  if (messages !== res) {
         //      setMessages(res)
      })
   }

   return (
      <div id="main-container">
         <div id='headerBox'>
            <h1>Chat o Rama</h1>
            <RoomSelector setRoom={setRoom} />
            <div id='dividerLine'></div>
         </div>
         <div id="chat-container">
            <Room room={room} />
         </div>
         <div id='dividerLine'></div>


         <form onSubmit={onSubmitHandler}>
            <div id='formBox'>
               <div id='formLeftSide'>
                  <span>Author:
                  <input ref={authorInputRef} type="text" id="post-author"></input>
                  </span>
                  <input id='submitButton' type="submit" tabindex="-1"></input>
                  <button type="submit" onClick={refreshHandler} tabindex="-1">Refresh</button>
               </div>

               <div id='formRightSide'>
                  <span>Message:</span>
                  <textarea ref={contentInputRef} rows="5" cols="25" id="post-content"></textarea>
               </div>
            </div>
         </form>
      </div>
   );
}

export default App;
