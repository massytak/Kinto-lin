const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    reviewerID: {
      type: String,
      required: true
    },
    message : {
      type: String,
      maxLength: 240,
    },
    picture: {
      type: String,
    },
    video: {
      type:String,
    },
    likers: {
      type:[String],
      required: true,
    }
  },
  {
    timestamps: true,

  }
);

const ReviewsModel = mongoose.model("Reviews", reviewsSchema);
module.exports = ReviewsModel;
