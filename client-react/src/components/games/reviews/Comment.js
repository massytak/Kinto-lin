import React, { Component } from "react";
import RatingStars from "./RatingStars";
import { createReview } from "./review-service";
// import { updateReview } from "./review-service";
// import { deleteReview } from "./review-service";
import "../../../Styling/detailsGame.css"
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
        window.location.reload(false);
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
        <form onSubmit={this.handleFormSubmit} style={styles.formulaire}>
          <div className="itemForm" style={styles.itemForm}>
            <label style={styles.h3}>Share your experience: </label>
            <div style={styles.itemForme}>
              <textarea
                placeholder="Your exprience here..."
                style={styles.zoneCommentaire}
                type="text"
                name="message"
                value={this.state.message}
                onChange={(e) => this.handleChange(e)}
              />
              <div>
                <div className='rattingStart' >
                  <RatingStars
                    parentCallback={this.callbackFunction}
                    {...this.props}
                  />
                </div>
              </div>
            </div>

            <button style={styles.button}>Submit</button>
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
  },
  zoneCommentaire: {
    border: "3px solid #2ecc71",
    borderRadius: 5,
    width: "80%",
    marginTop: "25px",
    minHeight: 100,
    maxHeight: 100,
    padding: 10,
    backgroundColor: "#212529",
    color: "#2ecc71",
    alignItems: "center",
  },
  button: {
    border: "3px solid #2ecc71",
    borderRadius: 5,
    width: 200,
    padding: 10,
    backgroundColor: "#212529",
    color: "#2ecc71",
    cursor: "pointer",
    margin: "25px 0px 0px 0px",
    alignItems: "center",
  },
  h3: {
  
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
    alignItems: "center",
    position: "relative",
  },
  itemForme: {
    position: "",
  },
  error: {
    margin: "25px 25px 50px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center",
  },
  
};

export default Comment;
