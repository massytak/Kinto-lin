/** @format */

import React, { Component } from "react";
import "./App.css";
// import all components//////
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import { loggedin } from "./components/auth/auth-service";
import Login from "./components/auth/Login";

class App extends Component {
  // auth service functionality
  state = { loggedInUser: null }; // 1.

  // check le user
  fetchUser() {
    if (this.state.loggedInUser === null) {
      loggedin()
        .then((response) => {
          this.setState({ loggedInUser: response });
        })
        .catch((err) => {
          this.setState({ loggedInUser: false });
        });
    }
  }

  // HERE
  componentDidMount() {
    this.fetchUser();
  }

  // 2.
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj,
    });
  };
  render() {
    return (
      <div className="App">
        <Navbar userInSession={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />

        <Switch>
          <Route exact path="/signup" component={Signup} />

          <Route
            exact
            path="/signup"
            render={() => <Signup updateUser={this.updateLoggedInUser} />}
          />
          <Route
            exact
            path="/login"
            render={() => <Login updateUser={this.updateLoggedInUser} userInSession={this.state.loggedInUser} />}
          />
          <Route
            exact
            path="/logout"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route exact path="/home" 
          render={()=><Home userInSession={this.state.loggedInUser} />}/>

          <Route exact path="/about" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
