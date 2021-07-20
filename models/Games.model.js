const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    trailer: String,
    gameId: Number,
    note: String,
    title:String,
    thumbnail: String,
    short_description: String,
    game_url: String,
    genre: String,
    platform: String,
    publisher: String,
    developer: String,
    release_date: String,
    freetogame_profile_url: String,
    added: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const GamesModel = mongoose.model("Games", gamesSchema);
module.exports = GamesModel;
