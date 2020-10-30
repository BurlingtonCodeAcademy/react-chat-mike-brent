const dataStore = require('./dataStore')
require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir ="./client/build";

app.use(express.static(staticDir));

app.get("/room/:room", async (req, res) => {
    
    let postList = await dataStore.showRoomPosts(req.params.room)
    res.send(postList)
})



app.get("*", (req, res) => {
    console.log("getting here")
    res.sendFile(__dirname + "/client/build/index.html");
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
