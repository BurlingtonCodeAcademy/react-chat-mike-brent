import React, { useState, useRef } from "react";
import "./App.css";
import Room from "./components/Room.js";
import RoomSelector from "./components/RoomSelector.js";

function App() {
   // hook for room selected - room 'state'
   const [room, setRoom] = useState("one");
   // references to author and posts created from db
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
         body: JSON.stringify({ // send post content and author to db
            post: {
               author: authorInputRef.current.value,
               content: contentInputRef.current.value,
            },
         }),
      });
   };

   // refresh the content of the post div
   async function refreshHandler(event) {
      await fetch(`/room/${room}`).then((res) => { // get all posts
         return res.json();
      })
   }

   return (
      <div id="main-container">
         {/* header area */}
         <div id='headerBox'> 
            <h1>Chat o Rama</h1>
         {/* selects which chat room shows */}
            <RoomSelector setRoom={setRoom} /> 
            <div id='dividerLine'></div>
         </div>
         {/* chat post area */}
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
