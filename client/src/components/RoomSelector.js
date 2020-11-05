// use React
import React from "react";

// create RoomSelector component
export default function RoomSelector({ setRoom }) {
   // get setRoom updater function from Rooms
   function roomOneHandler(event) {
      event.preventDefault()
      setRoom('one'); // set room state to one
   }

   function roomTwoHandler(event) {
      event.preventDefault()
      setRoom('two'); // set room state to two
   }

   return (
      <div id="selector-box">
         {/* button to set room state to one */}
         <button type='submit' onClick={roomOneHandler} >Room One</button>
         {/* button to set room state to two */}
         <button type='submit' onClick={roomTwoHandler} >Room Two</button>
      </div>
   )
}
