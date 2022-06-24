const express = require("express");
const { nextTick } = require("process");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  const post = req.body;
  console.log(post);
  res.status(201).json({
    message: 'Post added successfully!!'
  });
});

app.get("/api/posts", (req, res, next) => {
  const posts = [
    {
      id: "faedasd234234",
      title: "first server-side post",
      content: "this is comming from the backend",
    },
    {
      id: "csdf345345324",
      title: "second server-side post",
      content: "this is comming from the backend",
    },
  ];
  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
});

//export the app
module.exports = app;
