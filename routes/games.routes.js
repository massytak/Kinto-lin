const express = require("express");
const gamesRoutes = express.Router();
const axios = require("axios");
const Games = require("../models/Games.model");
const { response } = require("express");
const mongoose = require("mongoose");
////////POST ajouter un jeux sur notre base de donnee depuis L'API/////
gamesRoutes.post("/", (req, res, next) => {
  let gameId = req.body.gameId;
  let titlesearch = req.body.titlesearch;
  console.log("magameiddefiner", gameId);
  axios
    .get(`https://www.freetogame.com/api/games`)
    .then((response) => {
      // handle success
      console.log("la data de gameID", response.data[gameId]);
      console.log("titlesearch:", titlesearch);
      //trouver l'element du tableau qu'on souhaite grace au nom du jeux

      //chercher avec un titre exact
      let titleFind = response.data.find((el) => {
        return el.title === titlesearch;
      });
      console.log(titleFind);
      axios
        .get(`https://www.freetogame.com/api/game?id=${titleFind.id}`)
        .then((detailGame) => {
          console.log('helloword massi',detailGame.data)
          Games.create({
            trailer: `https://www.freetogame.com/g/${titleFind.id}/videoplayback.webm`,
            gameId: titleFind.id,
            title: titleFind.title,
            thumbnail: titleFind.thumbnail,
            status:detailGame.data.status,
            short_description: titleFind.short_description,
            description:detailGame.data.description,
            game_url: titleFind.game_url,
            genre: titleFind.genre,
            platform: titleFind.platform,
            publisher: titleFind.publisher,
            developer: titleFind.developer,
            release_date: titleFind.release_date,
            freetogame_profile_url: titleFind.freetogame_profile_url,
            minimum_system_requirements:detailGame.data.minimum_system_requirements,
            screenshots:detailGame.data.screenshots,
            added: true,
          })
            .then((response) => {
              res.json(response);
            })
            .catch((err) => {
              res.json(err);
            });
        })
        .catch((err) => {
          res.json(`le detail du jeux ${titleFind.id} n'a pas etait trouvé`);
        });
    })
    .catch(function (error) {
      // handle error
      res.json({
        message:
          "veuillez ecrire le nom du jeux, avec la nomination exact sur la base de freetogame",
      });
    });
});
/////////GET Read our DATA////////////
gamesRoutes.get("/", (req, res, next) => {
  Games.find()
    .then((allGames) => {
      res.json(allGames);
    })
    .catch((err) => {
      res.json(err);
    });
});
///////////GET detail of one game//////////
gamesRoutes.get("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Games.findById(req.params.id)
    .then((gameDetail) => {
      res.status(200).json(gameDetail);
    })
    .catch((err) => {
      res.json(err);
    });
});

///////////PUT modifier la data///////////
gamesRoutes.put("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Games.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      res.json({
        message: `Project with ${req.params.id} is updated successfully.`,
      });
    })
    .catch((err) => {
      res.json(err);
    });
});

///////////DELETE THE GAME BY ID/////////
gamesRoutes.delete("/:id", (req, res, next) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }
  Games.findByIdAndDelete(req.params.id)
    .then(() => {
      res.json({
        message: `votre jeux ${req.params.id} a ete bien supprimer de la data`,
      });
    })
    .catch((err) => res.json(err));
});

module.exports = gamesRoutes;
