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
        <form onSubmit={this.handleFormSubmit} style={styles.formulaire}>
          <div className="itemForm" style={styles.itemForm}>
            <label style={styles.h3}>Vos commentaires : </label>
            <textarea
              style={styles.zoneCommentaire}
              type="text"
              name="message"
              value={this.state.message}
              onChange={(e) => this.handleChange(e)}
            />
            <button style={styles.button}>Soumettre</button>
          </div>
        </form>
        <p style={styles.error}>{this.state.err}</p>
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
    border: "5px solid #2ecc71",
    borderRadius: 5,
    minWidth: 500,
    maxWidth: 500,
    margin: "25px 25px 50px 25px",
    minHeight: 100,
    maxHeight: 100,
    padding: 10,
    backgroundColor: "#212529",
    color: "#fff",
    alignItems: "center",
  },
  button: {
    border: "5px solid #2ecc71",
    borderRadius: 5,
    width: 200,
    padding: 10,
    backgroundColor: "#212529",
    color: "#fff",
    cursor: "pointer",
    margin: "25px 120px 50px 25px",
    alignItems: "center",
  },
  h3: {
    margin: "25px 25px 50px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center",
  },
  formulaire: {
    marginTop: "30px",
  },
  itemForm: {
    display: "flex",
    justifyContent: "spaceEvenly",
    alignItems: "center",
  },
  error: {
    margin: "25px 25px 50px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center"
  }
};

export default Comment;
