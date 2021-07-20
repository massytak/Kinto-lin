const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const Users = require('./User.model')

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: String,
    password: String,
    confirmpassword: String,
    admin:{type:Boolean, default: false},
    image: {
      type: String,
      default:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg/260px-Billie_Eilish_2019_by_Glenn_Francis_%28cropped%29_2.jpg",
    },
    favorisgame:{type:Array},
  },

  {
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
