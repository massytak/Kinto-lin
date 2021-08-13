/** @format */

import React, { Component } from "react";

import singeKinto from "../Styling/singe-kinto-un.png";
import Login from "../components/auth/Login";
import IsOnline from "../IsOnline";
import "../Styling/Home.css";
import { Link } from "react-router-dom";
class Home extends Component {
  state = {
    connectIn: this.props.userInSession,
    loggedInUser: "",
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
        <div>
          <img className="singe" src={singeKinto} alt="sigep" />
          <div className="bienvenue">Are you ready for the game?</div>
        </div>
        {this.props.userInSession ? (
          <p className="bienvenue" style={styles.message}>
            Bonjour {this.props.userInSession.username}{" "}
          </p>
        ) : (
          <>
          <div className='showone'>
          <Link to="/login">
            <button className="buttonclassname">Login</button>
          </Link>
          <Link to="/signup">
            <button className="buttonclassname">Signup</button>
          </Link>
          
          </div>
          <div className='hiddenone'>
            <Login
              className="logformhomepage"
              updateUser={this.updateLoggedInUser}
              userInSession={this.state.loggedInUser}
              {...this.props}
            />
          </div>
          
          </>
        )}
        <IsOnline/>
      </div>
    );
  }
}

const styles = {
  message: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center",
  },
};

export default Home;
