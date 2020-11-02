import React, { useState, useRef } from "react";
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
         <div id='headerBox'>
            <h1>Chat o Rama</h1>
            <RoomSelector setRoom={setRoom} />
            <div id='dividerLine'></div>
         </div>
         <div id="chat-container">
            <Room room={room} />
         </div>

         <div id="bottom-container">
            <div id='dividerLine'></div>

            <div id='formBox'>
               <form onSubmit={onSubmitHandler}>
                  
                  <span>Author: </span>
                  <input ref={authorInputRef} type="text" id="post-author"></input>
                  <br />
                  <span>Message: </span>
                  <input ref={contentInputRef} type="text" id="post-content"></input>
                  <div id="button-box">
                     <input type="submit"></input>
                  </div>
               </form>
            </div>

            <button type="submit" onClick={refreshHandler}>
               Refresh
        </button>
         </div>

      </div>
   );
}

export default App;
