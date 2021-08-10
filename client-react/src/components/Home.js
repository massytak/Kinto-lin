/** @format */

import React, { Component } from "react";

import singeKinto from "../Styling/singe-kinto-un.png";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
class Home extends Component {
  state = {
    connectIn: this.props.userInSession,
    loggedInUser: "",
    signup: false,
    login: true,
  };

  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };

  activeSginup = () => {
    this.setState({
      login: false,
      signup: true,
    });
  };
  activeLogin = () => {
    this.setState({
      signup: false,
      login: true,
    });
  };
  render(props) {
    const divStyle = {
      paddingTop: "5em",
    };
    return (
      <div style={divStyle}>
        <img src={singeKinto} alt="sigep" />
        {this.props.userInSession ? (
          <p className="bienvenue">Bonjour {this.props.userInSession.username} </p>
        ) : (
          <div>
            <div>Bienvenue sur la home page</div>
            <button onClick={this.activeLogin}>login</button>
            <button onClick={this.activeSginup}>Signup</button>
            {this.state.login && (
              <Login
                updateUser={this.updateLoggedInUser}
                userInSession={this.state.loggedInUser}
                {...this.props}
              />
            )}
            {this.state.signup && (
              <Signup
                updateUser={this.updateLoggedInUser}
                userInSession={this.state.loggedInUser}
                {...this.props}
              />
            )}
          </div>
        )}
      </div>
    );
  }
}

export default Home;
