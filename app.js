const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require('dotenv').config()

const app = express();

const psw = process.env.PSW;

//mondodb atlas connection string
const dbURI = `mongodb+srv://test_user:${psw}@cluster0.fkxqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((error) => console.log(error));

app.set("view engine", "ejs");

//let arr = ["a", "b", "c", "d", 1, 2, 3, 4];
let arr = [];

app.get("/", (req, res) => {
  res.render("home", { title: "Home", arr });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

app.get("/add-blog", (req, res) => {
  const blog = new Blog({
    title: "new blog",
    snippet: "about my new blog",
    body: "more about my new blog",
  });

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3000);
