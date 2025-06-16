require('dotenv').config();

const express = require("express");
const app = express();
const path = require("path");
const db = require("./config/mongoose-connnection");
const session = require('express-session');
const flash = require("express-flash");


const indexRouter = require("./routes/indexRouter");
const ownersRouter = require("./routes/ownersRouter");
const usersRouter = require("./routes/usersRouter");
const productsRouter = require("./routes/productsRouter");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");


app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // Increase limit as needed
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json({ limit: '10mb' })); // Increase limit as needed
app.use(cookieParser());

app.use(session({
  secret: "your_secret_key",
  resave: false,
  saveUninitialized: true
}));
app.use(flash());

// app.use((req, res, next) => {
//   res.locals.success = req.flash('success');
//   res.locals.error = req.flash('error');
//   next();
// });


app.use("/", indexRouter)
app.use("/owners", ownersRouter);
app.use("/users", usersRouter);
app.use("/products", productsRouter);



app.listen(3000);