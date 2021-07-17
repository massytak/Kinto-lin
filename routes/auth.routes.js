const express = require("express");
// const passport = require('passport');
const router = express.Router();
const User = require("../models/User");

// Bcrypt to encrypt passwords
const bcrypt = require("bcryptjs");
const bcryptSalt = 10;

//////////////////////////// Sign Up/////////////////////////////

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const password = req.body.password;
    const image= req.body.image;
  
    if (!username || !password|| !email|| !image) {
      res.status(400).json({message: "Indicate username,password,email and download a picture"});
      return;
    }