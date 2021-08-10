import React, { Component } from "react";
import RatingStars from "./RatingStars";
import { createReview } from "./review-service";
// import { updateReview } from "./review-service";
// import { deleteReview } from "./review-service";

class Comment extends Component {
  state = { message: "", note: 0, err: null, id: this.props.match.params.id };

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
        // this.props.history.push(`/listgames/${this.state.id}`)
        window.location.reload(false)
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
          <label>Vos commentaires : </label>
          <input
            type="text"
            name="message"
            value={this.state.message}
            onChange={(e) => this.handleChange(e)}
          />

          <button>Soumettre</button>
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
