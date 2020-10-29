require("dotenv").config();
const express = require("express");
const path = require("path");

const port = process.env.PORT || 8000;
const app = express();
const staticDir ="./client/build";

app.use(express.static(staticDir));

app.get("/", (req, res) => {
  console.log("getting here")
  res.sendFile(__dirname + "/client/build/index.html");
});

app.get("/api/rooms", (req, res) => {
  res.send(["room1", "room2", "room3"]);
});

app.listen(port, () => {
  console.log("listening on port: " + port);
});
