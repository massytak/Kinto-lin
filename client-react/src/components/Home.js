/** @format */

import React, { Component } from "react";

import singeKinto from "../Styling/singe-kinto-un.png";

import "../Styling/Home.css";
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
    
    return (
      <div className="formhome">
        <img className="singe" src={singeKinto} alt="sigep" />
        {this.props.userInSession ? (
          <p className="bienvenue" style={styles.message}>Bonjour {this.props.userInSession.username} </p>
        ) : (
          <div>
            <div className="bienvenue">Are you ready for the game?</div>
            {/* <button onClick={this.activeLogin}>login</button>
            <button onClick={this.activeSginup}>Signup</button>
            {this.state.login && (
              <Login
              className="logformhomepage"
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
            )} */}
          </div>
        )}
      </div>
    );
  }
}


const styles = {
  message: {
    margin: "25px 25px 50px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center"
  }
};

export default Home;
