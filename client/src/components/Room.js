import React, { useEffect, useState } from "react";

import "./rooms.css";

export default function Room({ room }) {
   const [messages, setMessages] = useState([]);

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
      fetchAndPopulate();
      const interval = window.setInterval(() => {
         fetchAndPopulate();
      }, 10000);
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
