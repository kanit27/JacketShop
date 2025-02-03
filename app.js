const express = require("express");
const app = express();
const path = require("path");
// const userModel = require("./models/user");
// const postModel = require("./models/post");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hellow");
});


app.listen(3000);