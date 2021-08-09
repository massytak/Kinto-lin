/** @format */

import React, { Component } from "react";

class Home extends Component {
  render() {
    return (
      <>
        {this.props.userInSession ? (
          <p className="bienvenue">Bonjour {this.props.userInSession.username} </p>
        ) : (
          <div>
            <p>Bienvenue sur la home page</p>
            <img src="https://img.favpng.com/18/9/21/sun-wukong-art-dota-2-drawing-t-shirt-png-favpng-qZyjtcL2CLtNKUcfRT5nspLeu.jpg" alt="kinto-un logo"></img>
          </div>
        )}
   
      </>
    );
  }
}

export default Home;
