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
          color="#fff"
          activeColor="#2ecc71"
          size={50}
          count={5}
          onChange={this.ratingChanged}
        />
      </div>
    );
  }
}

const styles = {
  rating: {
    border: "3px solid #2ecc71",
    borderRadius: "5px",
    backgroundColor: "#212529",
    padding: "5px 30px",
    margin: "100px 50px 25px 50px",
  },
};

export default RatingStars;
