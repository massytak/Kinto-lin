import React, { Component } from "react";
import ReactStars from "react-rating-stars-component";

class RatingStars extends Component {
 
  ratingChanged = (rating) => {
    // console.log(`You have given ${rating} star rating for us.`);
    // this.setState({ note: rating });
    this.props.parentCallback(rating);
  };
  // sendData = () => {
  //   this.props.parentCallback(this.state.note);
  // };

  render() {
    return (
      <div>
        <ReactStars
          color="#212529"
          activeColor="#2ecc71"
          size={50}
          count={5}
          onChange={this.ratingChanged}
        />
      </div>
    );
  }
}

export default RatingStars;
