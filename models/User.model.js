const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {type:String,unique:true},
    email: String,
    password: String,
    image:String,
    favorisgame:{
      type: String,
      enum:[]
    }
  },

  {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }, 
  {
    admin: True,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
