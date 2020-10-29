import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom'
import './App.css';
import Room from './components/Room.js'



function App() {
  return (
    <div id='main-container'>
<Room/>
<h1>REACT!</h1>


     
    </div>
  );
}

export default App;
