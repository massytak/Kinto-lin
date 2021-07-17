const express = require("express");
const gamesRoutes = express.Router();
const axios = require("axios");
const Games = require("../models/Games.model");

//
gamesRoutes.post("/", (req, res, next) => {
  const trailer = `https://www.freetogame.com/g/${req.body.trailer}/videoplayback.webm`;
  let gameId = req.body.gameId;
  const added = true;
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
    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });
});

module.exports = gamesRoutes;
