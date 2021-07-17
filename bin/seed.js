require('dotenv').config({
    path: require('path').resolve(__dirname, '../.env')
  });
  
const mongoose = require("mongoose");
const User = require("../models/User");