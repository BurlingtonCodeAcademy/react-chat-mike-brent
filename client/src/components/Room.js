//  import components 
import React, { useEffect, useState } from "react";
// import "./rooms.css";

//  create Room component
export default function Room({ room }) {
   // hook set messages in state
   const [messages, setMessages] = useState([]);

   // when Room changes - reload messages for new room
   useEffect(() => {
      // use 'room' passed in from RoomSelector as ID
      const fetchAndPopulate = () => {
         fetch(`/room/${room}`) // send request with room ID
            .then((res) => {
               return res.json();
            })
            .then((res) => {
               if (messages !== res) {
                  setMessages(res); // set messages in state
               }
            });
      }

      fetchAndPopulate(); // load posts from default room one on page load

      const interval = window.setInterval(() => {
         fetchAndPopulate(); // reload posts every one second
      }, 1000);
      return () => {
         window.clearInterval(interval);
      }
   }, [room]);

   // use messages in state to create new array and print array to the screen 
   let messageDiv = messages.map((message) => {
      return (
         <p key={message._id}>
            {/* top line of each chat message */}
            <div id='byLine'>
               <div id='byAuthor'> {message.author}</div>
               <div id='byTime' >  {new Date(message.date).toLocaleString()}</div>
            </div>
            {/* second line of each chat message */}
            <div id='messageText'>
               {message.content}
            </div>
            <br />
            {/* divider line between chat messages */}
            <div id='line'></div>
         </p>
      );
   });

   return ( // return populated mesage box
      <div id="post-box">
         <div id='messageContent'>{messageDiv}</div>
      </div>
   );
}
