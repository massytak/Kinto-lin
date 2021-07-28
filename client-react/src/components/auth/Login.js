/** @format */

import React, { Component } from "react";
import { login } from "./auth-service";
import { Link, Redirect } from "react-router-dom";

class Login extends Component {
  state = { username: "", password: "", err: null };

  handleFormSubmit = (event) => {
    event.preventDefault();
    const username = this.state.username;
    const password = this.state.password;

    login(username, password)
      .then((response) => {
        this.setState({ username: "", password: "" });
        this.props.updateUser(response);
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
      <div>
        {this.props.userInSession ? (
          <Redirect to="/home" />
        ) : (
          <form onSubmit={this.handleFormSubmit}>
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={(e) => this.handleChange(e)}
            />

            <label>Password:</label>
            <textarea
              name="password"
              value={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />

            <input type="submit" value="Login" />
          </form>
        )}
        <p>{this.state.err}</p>
        <p>
          Don't have account?
          <Link to={"/signup"}>Register</Link>
        </p>
      </div>
    );
  }
}

export default Login;
