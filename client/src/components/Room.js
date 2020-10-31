import React, { useEffect, useState } from "react";

import "./rooms.css";

export default function Room() {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
   
   fetch('http://localhost:8000/room/one').then((res) => {
       return res.json();

   }).then((res) => {setMessages(res)}) 

  },[])
  
  let messageDiv = messages.map((message) => {
  return <div>{message.date} {message.author} {message.body}</div>;
  });
  return <div id="post-box">{messageDiv}</div>;
}

// function() {}
// () => {}
// (arg) => {}
// arg => {}
// arg => { return 1; }
// arg => 1
// (arg1, arg2) => {

// }

// const multipliedByTwoArray = [1,2,3].map((item) => item * 2)
// multipliedByTwoArray looks like [2,4,6]
