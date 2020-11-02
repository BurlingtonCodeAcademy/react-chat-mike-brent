//  import components 
import React, { useEffect, useState } from "react";
import "./rooms.css";

//  create Room component
export default function Room({ room }) {
   //  set messages in state
   const [messages, setMessages] = useState([]);

   // when Room changes - reload messages for new room
   useEffect(() => {
      const fetchAndPopulate = () => {
         fetch(`/room/${room}`)
            .then((res) => {
               return res.json();
            })
            .then((res) => {
               if (messages !== res) {
                  setMessages(res);
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

   let messageDiv = messages.map((message) => {
      return (
         <p key={message._id}>
            <div id='byLine'>
               <div id='byAuthor'> {message.author}</div>
               <div id='byTime' >  {new Date(message.date).toLocaleString()}</div>
            </div>

            <div id='messageText'>
               {message.content}
            </div>
            <br />
            <div id='line'></div>
         </p>
      );
   });

   return (
      <div id="post-box">
         <div id='messageContent'>{messageDiv}</div>
      </div>
   );
}
