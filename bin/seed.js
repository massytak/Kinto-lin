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

const admin = {
  username: "admin",
  email: "admin@admin.com",
  password: bcrypt.hashSync("Admin2021", salt),
  admin: true,
  image: "https://d15k2d11r6t6rl.cloudfront.net/public/users/Integrators/BeeProAgency/401516_381081/editor_images/expertise.png",
  favorisgame: [],
};

User.insertMany(admin)
  .then((adminfromDb) => {
    console.log("admin a etait cree", adminfromDb);
  })
  .catch((err) => console.log(err));
