/** @format */

import React, { Component } from "react";

import { handleUpload } from "./auth-service";
import { editUser } from "./auth-service";
import { userInfo } from "./auth-service";

class Edit extends Component {
  state = {
    username: "",
    id: this.props.match.params.id,
    email: "",
    imageUrl: "",
  };

  // handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const email = this.state.email;
    const image = this.state.imageUrl;
    editUser(this.state.id, username, email, image)
      .then((userupdate) => {
        console.log(userupdate);
        this.props.history.push(`/viewprofil/${this.state.id}`);
      })
      .catch((err) => console.log(err));
  };
  componentDidMount() {
    userInfo(this.state.id).then((userInfo) => {
      this.setState({
        username: userInfo.username,
        email: userInfo.email,
      });
    });
  }
  //handlefiluploud()
  handleFileUpload = (e) => {
    console.log("The file to be uploaded is: ", e.target.files[0]);

    const uploadData = new FormData();
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);

    handleUpload(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({ imageUrl: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render(props) {
    const divstyle = {
      paddingTop: "5em",
      color: "red",
      backgroundColor: "yellow",
    };
    return (
      <div style={divstyle}>
        <form onSubmit={this.handleFormSubmit}>
          <label> New Username : </label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />
          <label> New Email : </label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />
          <br />

          <label>New Avatar : </label>
          <input type="file" onChange={(e) => this.handleFileUpload(e)} />

          <button>Update my profil</button>
        </form>
      </div>
    );
  }
}
export default Edit;
