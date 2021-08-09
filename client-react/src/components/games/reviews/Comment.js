import React, { Component } from "react";
import RatingStars from "./RatingStars";
import { createReview } from "./review-service";
// import { updateReview } from "./review-service";
// import { deleteReview } from "./review-service";

class Comment extends Component {
  state = { message: "", note: "", err: null, id: this.props.match.params.id };

  callbackFunction = (childData) => {
    this.setState({ note: childData });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const message = this.state.message;
    const note = this.state.note;

    createReview(message, note, this.props.match.params.id)
      .then(() => {
        this.setState({
          message: "",
          note: 0,
        });
        // this.props.history.push(`/games`)
        document.location.reload();
      })
      .catch((error) => {
        this.setState({ err: error.response.data.message });
        setTimeout(() => {
          this.setState({
            err: null,
          });
        }, 3000);
      });
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div style={styles.container}>
        <RatingStars parentCallback={this.callbackFunction} {...this.props} />
        <form onSubmit={this.handleFormSubmit}>
          <label style={styles.h3}>Vos commentaires : </label>
          <textarea
            style={styles.zoneCommentaire}
            type="text"
            name="message"
            value={this.state.message}
            onChange={(e) => this.handleChange(e)}
          />

          <button style={styles.button}>Soumettre</button>
        </form>
        <p>{this.state.err}</p>
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
  zoneCommentaire: {
    border: "1px solid #2C3E50",
    borderRadius: 5,
    minWidth: 300,
    maxWidth: 300,
    margin: "20px 0",
    minHeight: 100,
    maxHeight: 100,
    padding: 10,
    backgroundColor: "#212529",
    color: "#fff",
  },
  button: {
    border: "1px solid #2C3E50",
    borderRadius: 5,
    width: 200,
    padding: 10,
    backgroundColor: "#212529",
    color: "#fff",
    cursor: "pointer",
  },
  h3: {
    marginTop: "100px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
  },
};

export default Comment;
