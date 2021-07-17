/** @format */

///////// all requirements////////////////

const express = require("express");
// const passport = require('passport');
const router = express.Router();
const User = require("../models/User.model");
const fileUploader = require("../configs/cloudinary.config"); // for the images upload

// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;

//////////////////////////// Sign Up/////////////////////////////

router.post("/signup", fileUploader.single("image"),(req, res, next) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
//   const image = req.path.file;

  if (!username || !password || !email) {
    res
      .status(400)
      .json({
        message: "Indicate username,password, or email",
      });
      // password length 
    return;
    if (password.length< 7){
        res.status(400).json({message:'Please make your password at least 8 characters long for security purposes.'});
    }
    return;
}
   // when username is already taken
    User.findOne({ username })
.then(foundUser => {
  if (foundUser) {
    res.status(400).json({ message: 'Username taken. Choose another one.' });
    return;
  }

  // use bcrypt for password
  const salt     = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(password, salt);

  // save new user in api

  const aNewUser = new User({
    username:username,
    password: hashPass,
    email: email,
    // image: image,
  });

  aNewUser.save()
    .then(() => {
      // Persist our new user into session
      req.session.currentUser = aNewUser

     res.status(200).json(aNewUser);
    })
    .catch(err => {
      res.status(400).json({ message: 'Saving user to database went wrong.' });
    })
  ;
})
.catch(err => {
  res.status(500).json({message: "Username check went bad."});
})
;
});

//////////////////////////////// Log in /////////////////////////////////////////
router.post('/login', (req, res, next) => {
    const {username, password} = req.body /// ce dont l'utilisateur a besoin pour se connecter
   
    User.findOne({username})
    .then((user) => {
      if (!user) {
        return next(new Error('No user with that email'))
      }
      
      // compareSync
      if (bcrypt.compareSync(password, user.password) !== true) {
        return next(new Error('Wrong credentials'))
      } else {
        req.session.currentUser = user
        res.json(user)
      }
    }).catch(next=>console.log(next))
  });


  /////////////////////////////// Log out /////////////////////////////////////

  router.post('/logout', (req, res, next) => {
    req.session.destroy()
    res.json({message: 'Your are now logged out.'})
  });
   
  router.get('/loggedin', (req, res, next) => {
    if (req.session.currentUser) {
        res.status(200).json(req.session.currentUser);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
  });

module.exports = router;
