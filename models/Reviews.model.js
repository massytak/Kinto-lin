const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    reviewerID: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      maxLength: 240,
    },
  },
  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
