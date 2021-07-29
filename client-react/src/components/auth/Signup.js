import React, { Component } from "react";
import { signup } from "./auth-service";
import { Link } from "react-router-dom";

class Signup extends Component {
  state = { username: "", password: "", confirmPassword: "", email: "", err: null };

  // handleSubmit()
  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;
    const confirmPassword = this.state.confirmPassword;
    const email = this.state.email;

    signup(username, password, confirmPassword, email)
      .then((response) => {
        console.log("coucou");
        this.setState({
          username: "",
          password: "",
          confirmPassword: "",
          email: "",
        });
        this.props.updateUser(response);
        this.props.history.push("/home");
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
        <form onSubmit={this.handleFormSubmit}>
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

          {/* <label> Upload your picture</label>
        <input type="file" value ={this.state.imahe} onChange={e=> this.handleChange(e)} /> */}

          <button>I Signup</button>
        </form>
       <p>{this.state.err }</p>
        <p>
          Already have account?
          <Link to={"/login"}>Login</Link>
        </p>
      </div>
    );
  }
}
export default Signup;
