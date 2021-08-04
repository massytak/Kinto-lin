/** @format */

require("dotenv").config();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const express = require("express");
const favicon = require("serve-favicon");
const hbs = require("hbs");
const mongoose = require("mongoose");
const logger = require("morgan");
const path = require("path");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

// Set up the database
require("./configs/db.config");

// bind user to view - locals
const bindUserToViewLocals = require("./configs/user-local.config");

const app_name = require("./package.json").name;
const debug = require("debug")(
  `${app_name}:${path.basename(__filename).split(".")[0]}`
);

const app = express();
require("./configs/session.config")(app);

// Middleware Setup
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(bindUserToViewLocals);

// Express View engine setup
app.use(
  require("node-sass-middleware")({
    src: path.join(__dirname, "public"),
    dest: path.join(__dirname, "public"),
    sourceMap: true,
  })
);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
app.use(express.static(path.join(__dirname, "public")));
app.use(favicon(path.join(__dirname, "public", "images", "favicon.ico")));

//corse relation React front
app.use(
  cors({
    credentials: true,
    origin: [`http://localhost:${process.env.LOCAL_PORT}`], // <== this will be the URL of our React app (it will be running on port 3000)
  })
);

// default value for title local
app.locals.title = "Express - Generated with IronGenerator";

//routes
const index = require("./routes/index");
app.use("/", index);

const auth = require("./routes/auth.routes");
app.use("/auth", auth);

const games = require("./routes/games.routes");
app.use("/games", games);

const reviews = require("./routes/reviews.routes");
app.use("/reviews", reviews);

const twitch=require('./routes/twitch.routes')
app.use("/stream", twitch)

module.exports = app;
