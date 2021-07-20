require("dotenv").config({
  path: require("path").resolve(__dirname, "../.env"),
});

const mongoose = require("mongoose");
const User = require("../models/User.model");

const bcrypt = require("bcrypt");

const bcryptSalt = 10;
const salt = bcrypt.genSaltSync(bcryptSalt);

mongoose.connect(process.env.MONGODB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const admin = require("../json/userdata.json");
User.insertMany(admin)
  .then((adminfromDb) => {
    console.log("admin a etait cree", adminfromDb);
  })
  .catch((err) => console.log(err));
