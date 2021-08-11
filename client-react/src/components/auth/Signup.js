import React, { Component } from "react";
import { signup } from "./auth-service";
import { Link } from "react-router-dom";
import { handleUpload } from "./auth-service";
import "../../Styling/signup.css";
// import { saveNewThing } from "./auth-service"
class Signup extends Component {
  state = {
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    err: null,
    imageUrl: "",
    errImage: null,
    buttonload: "Signup",
  };

  // handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;
    const image = this.state.imageUrl;

    signup(username, password, confirmPassword, email, image)
      .then((response) => {
        console.log("coucou");
        this.setState({
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
          imageUrl: "",
        });
        this.props.updateUser(response);
        this.props.history.push("/");
      })
      //     .catch((error) => console.log(error));
      .catch((error) => {
        this.setState({ err: error.response.data.message });
        setTimeout(() => {
          this.setState({
            err: null,
          });
        }, 3000);
      });
  };
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
          buttonload: "Signup",
          imageUrl: response.secure_url,
          errImage: null,
        });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  // handleChange()
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  render() {
    return (
      // form design
      <div>
        {/* HERE */}
        <h3 className="h3">Join the community</h3>
        <form className="signupform" onSubmit={this.handleFormSubmit}>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={this.state.username}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={this.state.email}
            onChange={(e) => this.handleChange(e)}
          />

          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={this.state.password}
            onChange={(e) => this.handleChange(e)}
          />

          <label> Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={(e) => this.handleChange(e)}
          />
          <label className="file">
            Avatar
            {/* <label> Upload your picture</label>
        <input type="file" value ={this.state.imahe} onChange={e=> this.handleChange(e)} /> */}
            <input
              type="file"
              onChange={(e) => this.handleFileUpload(e)}
            />
          </label>
          <button className="signupbutton">{this.state.buttonload}</button>
        </form>
        <p style={styles.error}>{this.state.err}</p>
        <p className="signupP">
          Already have account?
          <Link className="linksignup" to={"/login"}>
            Login
          </Link>
        </p>
        {this.state.errImage && (
          <p style={styles.error}>{this.state.errImage}</p>
        )}
      </div>
    );
  }
}

const styles = {
  error: {
    margin: "25px 25px 50px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center",
  },
};

export default Signup;
