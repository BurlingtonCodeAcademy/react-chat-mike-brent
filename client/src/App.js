import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import Room from "./components/Room.js";

function App() {
  // hook for user name
  // hook for room selected - room 'state'

  return (
    <div id="main-container">
      <h1>Chat o  Rama</h1>
      <div id="top-container">
        <Room />
        <div id="selector-box">selector buttons</div>
      </div>
      <br />
      <div id="bottom-container">
        <form method="POST" action="/room/roomId" id="form">
          <input type="text-box" id="post-content"></input>
          <div id="button-box">
            <input type="submit" name="action" value="Submit"></input>
            <input type="submit" name="action" value="Refresh"></input>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
