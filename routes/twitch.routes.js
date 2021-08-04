///////// all requirements////////////////
const express = require("express");
const twitchRoutes = express.Router();
const axios = require("axios");
const Games = require("../models/Games.model");
const { response } = require("express");
const mongoose = require("mongoose");
const Reviews = require("../models/Reviews.model");
const User = require("../models/User.model");
const routeGuard = require("../configs/route-gard-isLog");
const session = require("../configs/session.config");
const { populate } = require("../models/Reviews.model");
const api = axios.create({
  headers: {
    "Client-ID": process.env.TWITCH_CLIENT_ID,
    Authorization: process.env.TWITCH_AUTHORISATION,
  },
});

twitchRoutes.get("/games", (req, res, next) => {
  api
    .get("https://api.twitch.tv/helix/games/top")
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

twitchRoutes.get("/games/:id", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/streams?game_id=${req.params.id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

twitchRoutes.get("/live/:slug", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/streams?user_login=${req.params.slug}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

twitchRoutes.get("/resultats/:cleanSearch", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/users?login=${req.params.cleanSearch}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

twitchRoutes.get("/sidebar", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/streams`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

twitchRoutes.get("/game/:id", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/games?id=${req.params.id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});
twitchRoutes.get("/streamer/:id", (req, res, next) => {
  api
    .get(`https://api.twitch.tv/helix/users?id=${req.params.id}`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((err) => res.status(401).json(err));
});

module.exports = twitchRoutes;
