import React, { Component } from "react";
import RatingStars from "./RatingStars";
// import axios from "axios";
// import { createReview } from "./review-service";
// import { updateReview } from "./review-service";
// import { deleteReview } from "./review-service";

class Comment extends Component {
  render() {
    return (
      <div style={styles.container}>
        <h2>Commentaires :</h2>
        <RatingStars />
        <textarea placeholder="Vos commentaires" style={styles.textarea} />
        <button style={styles.button}>Soumettre</button>
      </div>
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textarea: {
    border: "1px solid #2C3E50",
    borderRadius: 5,
    width: 300,
    margin: "20px 0",
    minHeight: 100,
    padding: 10,
    backgroundColor: "#2C3E50",
    color: "#00FF00",
  },
  button: {
    border: "1px solid #2C3E50",
    borderRadius: 5,
    width: 300,
    padding: 10,
    backgroundColor: "#2C3E50",
    color: "#00FF00",
  },
};

export default Comment;
