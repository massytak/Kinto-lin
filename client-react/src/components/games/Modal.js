import React, { Component } from "react";

import Login from "../auth/Login";
class Modal extends Component {
  state = { loggedInUser: null };
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };
  render(props) {
    const divstyle = {
      paddingTop: "5em",
    };
    return (
      <div style={divstyle}>
        <p style={styles.message}>You need to login</p>
        <Login
          updateUser={this.updateLoggedInUser}
          userInSession={this.state.loggedInUser}
          {...this.props}
        />
      </div>
    );
  }
}

const styles = {
  message: {
    margin: "25px 25px 0px 50px",
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    textShadow: "-2px 0 black, 0 2px black, 2px 0 black, 0 -2px black",
    alignItems: "center",
  },
};

export default Modal;
