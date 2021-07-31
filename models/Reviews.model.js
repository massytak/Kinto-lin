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
    gameId: {
      type: Schema.Types.ObjectId, // recuperer id du game
      ref: "Games",
    },
    note: { type: Number, default: 0 },
  },

  {
    timestamps: true,
  }
);

const Reviews = mongoose.model("Reviews", reviewsSchema);
module.exports = Reviews;
