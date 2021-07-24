/** @format */

///////// all requirements////////////////

const express = require("express");
// const passport = require('passport');
const router = express.Router();
const User = require("../models/User.model");

/////////// route gard + cloudinary/////////////////////
const fileUploader = require("../configs/cloudinary.config"); 
const routeGuard = require("../configs/route-gard-isLog")
const session =require('../configs/session.config')
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//////////////////////////// Sign Up/////////////////////////////

router.post("/signup", fileUploader.single("image"), (req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const image = req.path.file;
  const confirmPassword = req.body.confirmPassword;
  const regex = new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/);

  if (!username || !password || !email) {
    res.status(400).json({
      message: "Indicate username,password, or email",
    });
    // password length
    return;
  }

  if (!regex.test(password) === true) {
    res
      .status(400)
      .json({
        message:
          "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
      });

    return;
  }
  
  // when username is already taken
  console.log("confirmPassword", confirmPassword);
  console.log("password", password);
  if (password !== confirmPassword) {
    console.log("le confirm password is bad");
    res.status(400).json({
      message: "le confirm password is bad",
    });
    return;
  }
  // make sure passwords are strong:

  if (password === confirmPassword) {
    User.findOne({ username })
      .then((foundUser) => {
        if (foundUser) {
          res
            .status(400)
            .json({ message: "Username taken. Choose another one." });
          return;
        }

        // use bcrypt for password
        const salt = bcrypt.genSaltSync(10);
        const hashPass = bcrypt.hashSync(password, salt);

        // save new user in api

        const aNewUser = new User({
          username: username,
          password: hashPass,
          email: email,
          // image: image,
        });

        aNewUser
          .save()
          .then(() => {
            // Persist our new user into session
            req.session.currentUser = aNewUser;

            res.status(200).json(aNewUser);
          })
          .catch((err) => {
            res
              .status(400)
              .json({ message: "Saving user to database went wrong." });
          });
      })
      .catch((err) => {
        res.status(500).json({ message: "Username check went bad." });
      });
  }
});

//////////////////////////////// Log in /////////////////////////////////////////

router.post("/login", (req, res, next) => {
  const { username, password } = req.body; /// ce dont l'utilisateur a besoin pour se connecter

  User.findOne({ username :username})
    .then((user) => {
      if (!user) {
        res
          .status(400)
          .json({ message: "ther are not user with this username" });
      }

      // compareSync
      if (bcrypt.compareSync(password, user.password) !== true) {
        res.status(404).json({message:'mot de passe incorrect'})
        return;
      } else {
        req.session.currentUser = user;
        res.json(user);
      }
    })
    .catch((next) => console.log(next));
});

/////////////////////////////// Log out /////////////////////////////////////

router.post("/logout", (req, res, next) => {
  req.session.destroy();
  res.json({ message: "Your are now logged out." });
});
///////////////////////////////////////////////////
router.get("/loggedin", (req, res, next) => {
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
  }
  res.status(403).json({ message: "non connecter" });
});

/////////////////////////////// Edit user/////////////////////////////////

router.put("/edit/:id", (req, res, next) => {
  User.findByIdAndUpdate({ _id: req.params.id }, req.body).then((user) => {
    User.findOne({ _id: req.params.id }).then((user) => {
      res.send({ user });
    });
  });
});

////////////////////////////Delete user/////////////////////////////

router.delete("/delete/:id", (req, res, next) => {
  console.log(req.params.id);
  User.findByIdAndRemove(req.params.id)
    .then((user) => res.status(200).json(user))
    .catch((err) => next(err));
});

module.exports = router;
