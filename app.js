const express = require("express");
const mongoose = require("mongoose");
const Blog = require("./models/blog");
require("dotenv").config();

const app = express();
app.listen(3000, () => {
  console.log("app listening to port 3000");
});

//take db connection user password from .env file
const psw = process.env.PSW;

//mondodb atlas connection string
const dbURI = `mongodb+srv://test_user:${psw}@cluster0.fkxqb.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//connecting to the MongoDB Atlas online database
mongoose
  .connect(dbURI)
  .then((result) => {
    console.log("connected to db");
  })
  .catch((error) => console.log(error));

//setting up view engine and public static files directory
app.set("view engine", "ejs");
app.use(express.static("public"));

////////////////Routes///////////////////////////////////////////////////////////////////////////////////

app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});


app.get('/blogs', (req, res) => {
  Blog.find().sort({ createdAt: -1 })
    .then(result => {
      res.render('allblogs', { blogs: result, title: 'All blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

app.post("/blogs", (req, res) => {
  const blog = new Blog( req.body);

  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => {
      console.log(err);
    });
});

app.get("/blogs/create", (req, res) => {
  res.render("create", { title: "Create a new blog" });
});

app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
