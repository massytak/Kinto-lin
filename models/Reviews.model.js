const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId, // recuperer id du user qui poste le review
      ref: "User",
    },
    message: {
      type: String,
      maxLength: 240,
    },
    gameIdFromMongo: String,
    note: String,
  },

  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
