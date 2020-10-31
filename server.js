// server Setup ********************************
require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const staticDir = "./client/build";
app.use(express.static(staticDir));
const path = require("path");
const cors = require("cors");
// middleware
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// bring in Mongooose *******************************
const mongoose = require("mongoose");
//Open connection to database
console.log(process.env.DBPASS);
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
app.post("/room/:roomId ", async (req, res) => {
  {
    roomId === "one" ? (roomVar = RoomOne) : (roomVar = RoomTwo);
  }
  let postIn = req.body.post;

  await addNewPost(req.params.room, postIn);
});

// CRUD operations *************************************

// add new post to collection
async function addNewPost(roomId, postObj) {
  {
    roomId === "one" ? (roomVar = RoomOne) : (roomVar = RoomTwo);
  }

  let newPostObj = {
    date: postObj.date,
    author: postObj.author,
    content: postObj.content,
  };

  let newPost = new roomVar(newPostObj);
  newPost.save();
}

// show all posts for room
async function showRoomPosts(roomId) {

  {
    roomId === "one" ? (roomVar = RoomOne) : (roomVar = RoomTwo);
  }

  let roomPosts = await roomVar.find({});

  console.log(`posts are: `, roomPosts);
  return roomPosts;
}

// Home page route *****************************************
app.get("*", (req, res) => {
  console.log("getting here");
  res.sendFile(__dirname + "/client/public/index.html");
});
// start Server
app.listen(port, () => {
  console.log("listening on port: " + port);
});
