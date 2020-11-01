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
      <li key={message._id}>
        {new Date(message.date).toLocaleString()} {message.author}{" "}
        {message.content}
      </li>
    );
  });

  return (
    <div id="top-container">
      <div id="post-box">{messageDiv}</div>
    </div>
  );
}
