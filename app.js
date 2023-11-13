//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
const config = require("dotenv").config;
const _ = require("lodash");
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
const homeStartingContent =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
const aboutContent =
  "Hi, there I am Willium tiwari From a small town in UP. I have done my schooling in Khurja only which is situated in Bulandshahr, I got a 9.8 cgpa in 10th grade and 81% in 12th grade. then, I took a year break to prepare for  the Jee Examination, I got 96 percentile in that and got admission to Iiit Nagpur in ECE branch from there I learned so many things about the core and software part, As I am not interested in core so I have chosen Web development as the role for my future and I am doing web development for 2-3 years starting from basic languages Html, CSS till Nodejs and expressjs. I have covered all the things, and I have done my database practices in non sql database like MongoDB. I have learned the basic parts of Reactjs, also I have done Dsa in C++ programming language. I have worked on many projects for my self devlopment some of them are Simon memory game, Spotify clone, Tindog Webpage, Drum kit website, Dice game and many more. I have a strong passion for problem-solving and enjoy keeping up with the latest technology trends.";
const contactContent = "E-mail - williumtiwari123@gmail.com";

const connectDB = () => {
  const database = mongoose.connect("mongodb+srv://williumtiwari123:vashu1234@cluster0.mbkzukv.mongodb.net/", {
      dbName: "Daily-journal",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then((c) => {
      console.log(`Data base connected with server`);
    })
    .catch((err) => {
      console.log(err);
    });
};
connectDB();
const itemsSchema = {
  title: String,
  content: String
};
const Post = mongoose.model("Post", itemsSchema);

const post1 = new Post({
  title: "Home",
  content: "This is home page"
});
const post2 = new Post({
  title: "Day1",
  content: "lorem ipsum dolor sit amet, consectetur adip",
});
const defaultPosts = [post1,post2];




app.get("/", function (req, res) {
  Post.find({}, function (err, foundItems) {
    console.log("abs");
    if (foundItems.length === 0) {
      Post.insertMany(defaultPosts, function (err) {
        console.log("abvbdf");
        if (err) {
          console.log(err);
        } else {
          console.log("Successfully saved default items to DB.");
        }
      });
      res.redirect("/");
    } else {
      res.render("home", {
        StartingContent: homeStartingContent,
        posts: post,
      });

    }
  });
});
app.get("/contact", function (req, res) {
  res.render("contact", { ContactContent: contactContent });
});

app.get("/about", function (req, res) {
  res.render("about", { AboutContent: aboutContent });
});
app.get("/compose", function (req, res) {
  res.render("compose");
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.Posttitle,
    content: req.body.Postbody
  };
  posts.push(post);
  res.redirect("/");
});
app.get("/posts/:postname", function (req,res) {
  const requestedtitles = _.lowerCase(req.params.postname);
  posts.forEach(function(post) {
    const storedtitle = _.lowerCase(post.title);
    const cont = post.content;
    if (storedtitle === requestedtitles) {
      res.render("post", { postContent: cont, poststitle: post.title});
    } else {
      console.log("Not a match!");
    }
  });
  
});




app.listen(5000, function() {
  console.log("Server started on port 5000");
});
