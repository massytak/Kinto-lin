/** @format */

import React, { Component } from "react";
class Home extends Component {
  render() {
    return (
      <>
        {this.props.userInSession ? (
          <p>Bonjour {this.props.userInSession.username} </p>
        ) : (
          <div>Bienvenue sur la home page</div>
        )}
      </>
    );
  }
}

export default Home;
