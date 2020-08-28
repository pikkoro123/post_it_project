const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const postsRoutes = require("./routes/posts");
const userRoutes = require('./routes/user');

const app = express();

console.log("mongodb+srv://pallop:" + process.env.MONGO_ATLAS_PW + "@cluster0-p7o4t.mongodb.net/node-angular");
mongoose
  .connect(
    // "mongodb+srv://pallop:l5cfvxPozpKGUHMp@cluster0-p7o4t.mongodb.net/node-angular?retryWrites=true&w=majority"
    "mongodb+srv://pallop:" + process.env.MONGO_ATLAS_PW + "@cluster0-p7o4t.mongodb.net/node-angular"
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS, PUT"
  );
  next();
});

app.use("/api/posts", postsRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
