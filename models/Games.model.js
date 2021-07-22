const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gamesSchema = new Schema(
  {
    trailer: String,
    gameId: Number,
    note: String,
    title:String,
    thumbnail: String,
    status:String,
    short_description:String,
    description: String,
    game_url: String,
    genre: String,
    platform: String,
    publisher: String,
    developer: String,
    release_date: String,
    freetogame_profile_url: String,
    minimum_system_requirements:{type:Object},
    screenshots:{ type : Array , "default" : [] },
    reviews: [{
      type: Schema.Types.ObjectId, // recuperer id du user qui poste le review
      ref: "Reviews",
    }],
    added: { type: Boolean, default: false },
  },

  {
    timestamps: true,
  }
);

const GamesModel = mongoose.model("Games", gamesSchema);
module.exports = GamesModel;
