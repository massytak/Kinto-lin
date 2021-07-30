import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";

class RatingStars extends Component {
  state = { rate: 0 };
  ratingChanged = (rating) => {
    console.log(`You have given ${rating} star rating for us.`);
    this.setState({ rate: rating });
  };

  render() {
    return (
      <div>
        <ReactStars
          color="#2C3E50"
          activeColor="#00FF00"
          size={50}
          count={5}
          onChange={this.ratingChanged}
        />
      </div>
    );
  }
}

export default RatingStars;
