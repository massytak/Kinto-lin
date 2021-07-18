/** @format */

///////// all requirements////////////////

const express = require("express");
// const passport = require('passport');
const router = express.Router();
const Reviews = require("../models/Reviews.model");

////////////////////////////Create/////////////////////////////
router.post("/", (req, res, next) => {
  console.log( req.session.currentUser._id);
  const user = req.session.currentUser._id;
  const message = req.body.message;
  const review = new Reviews({
    user,
    message,
  });
  review
    .save()
    .then((review) => {
      console.log('Review created', review);
      res.status(200).json(review);
    })
    .catch((err) => {
      console.log("Error to create review");
      res.status(403).json({ message: 'Review not created' });
    });
});

////////////////////////////Read/////////////////////////////
router.get("/reviews", (req, res, next) => {
  Review.find()
    .then((review) => res.render("reviews", { review }))
    .catch((err) => next(err));
});

////////////////////////////Update/////////////////////////////
router.put("/reviews/:id", (req, res, next) => {
  Review.findOne({ _id: req.params.id })
    .then((review) => res.render("reviews", { review }))
    .catch((err) => next(err));
});

////////////////////////////Delete/////////////////////////////
router.delete("/reviews/:id", (req, res, next) => {
  console.log(req.params.id);
  Reviews.findByIdAndRemove(req.params.id)
    .then((review) =>  res.status(200).json(review))
    .catch((err) => next(err));
});

module.exports = router;