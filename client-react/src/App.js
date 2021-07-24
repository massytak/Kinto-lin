import React, { Component } from "react";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />

        <Switch>
          <Route exact path="/home" component={Home} />
          <Route exact path="/About" component={About} />
        </Switch>
      </div>
    );
  }
}

export default App;
