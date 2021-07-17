const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Users = require('./User.model')

const userSchema = new Schema(
  {
    username: {type:String,unique:true},
    email: String,
    password: String,
    image:String,
    // owner: req.session.currentUser._id,
    favorisgame:{
      type: String,
      enum:[]
    }
  },

  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
