import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from './components/auth/Signup';

class App extends Component {
  // auth service functionality
  state = { loggedInUser: null } // 1.
 
  // 2.
  updateLoggedInUser = (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/home" component={Home} />
          <Route exact path="/About" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
