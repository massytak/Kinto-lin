/** @format */

import React, { Component } from "react";

import { handleUpload } from "./auth-service";
import { editUser } from "./auth-service";
import { userInfo } from "./auth-service";
import  "../../Styling/editProfil.css";

class Edit extends Component {
  state = {
    username: "",
    id: this.props.match.params.id,
    email: "",
    imageUrl: "",
    errImage: null,
    buttonload: "Update my profil",
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
    console.log("avant", uploadData);
    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new thing in '/api/things/create' POST route
    uploadData.append("image", e.target.files[0]);
    this.setState({
      buttonload: "loading...",
      errImage: "please wait while we load your image...",
    });
    handleUpload(uploadData)
      .then((response) => {
        // console.log('response is: ', response);
        // after the console.log we can see that response carries 'secure_url' which we can use to update the state
        this.setState({
          buttonload: "Update my profil",
          imageUrl: response.secure_url,
          errImage: null,
        });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  render(props) {
    return (
      <div >
        <h3 className="edith3">Edit your profil</h3>
        <form className="editform"onSubmit={this.handleFormSubmit}>
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

          <button className="buttonedit">{this.state.buttonload}</button>
        </form>
        {this.state.errImage && <p>{this.state.errImage}</p>}
      </div>
    );
  }
}
export default Edit;
