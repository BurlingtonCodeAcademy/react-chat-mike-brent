// server Setup ********************************
require("dotenv").config();
const express = require("express");
var bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const staticDir = process.env.DEV ? "./client/public" : "./client/build";
const path = require("path");
const cors = require("cors");
// middleware
app.use(express.static(staticDir));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(bodyParser.json());

// bring in Mongooose *******************************
const mongoose = require("mongoose");
const { doesNotMatch } = require("assert");
//Open connection to database
mongoose.connect(
   `mongodb+srv://brent:${process.env.DBPASS}@cluster0.pvmyn.mongodb.net/chat-project?retryWrites=true&w=majority`,
   { useNewUrlParser: true, useUnifiedTopology: true }
);
const myDb = mongoose.connection;
// add event listener for connection errors
myDb.on("error", console.error.bind(console, "connection error:"));

//Top level schema for any post
const postSchema = new mongoose.Schema({
   date: Date,
   author: String,
   content: String,
});
// create collections for chat rooms
const RoomOne = mongoose.model("RoomOne", postSchema);
const RoomTwo = mongoose.model("RoomTwo", postSchema);

//API paths *****************************************

// from page fetch - show all posts for room selected
app.get("/room/:room", async (req, res) => {
   let postList = await showRoomPosts(req.params.room);
   res.send(postList);
});

// Post route for new posts
app.post("/room/:roomId", async (req, res) => {
   await addNewPost(req.params.roomId, req.body.post);
   res.sendStatus(201);
});

// CRUD operations *************************************

// add new post to collection
async function addNewPost(roomId, postObj) {
   { // use roomId to set roomvar to correct collection
      roomId === "one" ? (roomVar = RoomOne) : (roomVar = RoomTwo);
   }
   //create post object from data received from form
   let newPostObj = {
      date: Date.now(),
      author: postObj.author,
      content: postObj.content,
   };
   let newPost = new roomVar(newPostObj);
   newPost.save(); // save post to collection
}

// show all posts for room
async function showRoomPosts(roomId) {
   { // use roomId to set roomvar to correct collection
      roomId === "one" ? (roomVar = RoomOne) : (roomVar = RoomTwo);
   }
   let roomPosts = await roomVar.find({});
   return roomPosts; // get and return all posts from collection
}

// Home page route *****************************************
app.get("*", (req, res) => {
   res.sendFile(__dirname + "/client/public/index.html");
});
// start Server
app.listen(port, () => {
   console.log("listening on port: " + port);
});
