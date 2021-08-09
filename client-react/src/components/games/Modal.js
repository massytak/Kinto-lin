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
        <p>yous need to login</p>
        <Login
          updateUser={this.updateLoggedInUser}
          userInSession={this.state.loggedInUser}
          {...this.props}
        />
      </div>
    );
  }
}

export default Modal;
