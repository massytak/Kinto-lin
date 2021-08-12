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
      <div style={styles.rating}>
        <ReactStars
          color="grey"
          activeColor="#2ecc71"
          size={30}
          count={5}
          onChange={this.ratingChanged}
        />
      </div>
    );
  }
}

const styles = {
  rating: {
   
    borderRadius: "5px",
    
    padding: "5px 30px",
   
  },
};

export default RatingStars;
