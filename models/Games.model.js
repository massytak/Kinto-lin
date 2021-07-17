const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    trailer:String,
    gameId:Number,
    added:{type:Boolean,default: true}
  },
  {
    timestamps: true,

  }
);

const GamesModel = mongoose.model("Games", gamesSchema);
module.exports = GamesModel;
