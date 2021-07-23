/** @format */

///////// all requirements////////////////

const express = require("express");
// const passport = require('passport');
const router = express.Router();
const Reviews = require("../models/Reviews.model");
const Games = require("../models/Games.model");
const routeGuard = require("../configs/route-gard-isLog");

////////////////////////////Create/////////////////////////////
router.post("/create", (req, res, next) => {
  const message = req.body.message;
  const gameIdFromMongo = req.body.gameIdFromMongo;//c'est la valeur qui va nous parvenir depuis react id du jeux

  if (!req.session.currentUser) {
    res.status(400).json({ message: "you need to login" });
    return;
  }
  if (req.session.currentUser) {
    const user = req.session.currentUser._id;
    const review = new Reviews({
      user,
      message,
      gameIdFromMongo,
    });
    review
      .save()
      .then((reviewfdb) => {
        console.log("review", reviewfdb.id);
        console.log("gameIdFromMongo", gameIdFromMongo);
        Games.findById(gameIdFromMongo)
          .then((gamefromDb) => {
            let reviewsnow=gamefromDb.reviews
            reviewsnow.push(reviewfdb.id)
            console.log(reviewsnow);
            Games.findByIdAndUpdate(gameIdFromMongo, {
              reviews: reviewsnow
            })
              .then((updategame) => {
                res.status(200).json(reviewfdb);
              })
              .catch((err) => {
                res.json(err);
              });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => {
        console.log("Error to create review");
        res.status(403).json({ message: "Review not created" });
      });
  }
});
/////////////////////////////////////////////////////////////

////////////////////////////Read/////////////////////////////
router.get("/read/:id", (req, res, next) => {
  console.log(req.params.id);
  Reviews.findById(req.params.id)
    // .populate("gameIdFromMongo") si on veut afficher les detail du jeux concerneé
    .then((review) => res.status(200).json(review))
    .catch((err) => next(err));
});

////////////////////////////Update////////////////////////////
router.put("/update/:id", (req, res, next) => {
  Reviews.findByIdAndUpdate({ _id: req.params.id }, req.body).then((review) => {
    Reviews.findOne({ _id: req.params.id }).then((review) => {
      res.send({ review });
    });
  });
});

////////////////////////////Delete/////////////////////////////
router.delete("/delete/:id", (req, res, next) => {
  console.log(req.params.id);
  Reviews.findByIdAndRemove(req.params.id)
    .then((review) => res.status(200).json(review))
    .catch((err) => next(err));
});

module.exports = router;
