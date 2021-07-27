import React, { Component } from 'react';
import ReactStars from "react-rating-stars-component";

class RatingStars extends Component {
  state={rate:0}
 ratingChanged = (rating) => {
    console.log(`You have given ${rating} star rating for us.`);
    this.setState({rate:rating})
  };

  render() {
    return (
      <div className="App">
      <ReactStars
        activeColor="#00FF00"
        size={100}
        count={5}
        onChange={this.ratingChanged}
      />
    </div>
    )
  }
}

export default RatingStars
