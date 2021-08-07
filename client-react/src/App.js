/** @format */

import React, { Component } from "react";
// import "./Styling/app.css";
// import all components//////
import "./Styling/twitch.css"
import Home from "./components/Home";
import About from "./components/About";
// import Navbar from "./components/Navbar";
import { Switch, Route } from "react-router-dom";
import Signup from "./components/auth/Signup";
import { loggedin } from "./components/auth/auth-service";
import Login from "./components/auth/Login";
import ListGames from "./components/games/ListGames";
import DetailsGame from "./components/games/DetailsGame";
import AddGame from "./components/games/AddGame";
import EditGame from "./components/games/EditGame";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/stream/Header/Header";
// import Sidebar from "./components/stream/Sidebar/Sidebar";
import Games from "./components/stream/Games/Games";
import TopStreams from "./components/stream/TopStreams/TopStreams";
import Live from "./components/stream/Live/Live";
import GameStreams from "./components/stream/GameStreams/GameStreams";
import Resultats from "./components/stream/Resultats/Resultats";
import Erreur from "./components/stream/Erreur/Erreur";
import ViewProfile from "./components/auth/ViewProfile"
import Edit from "./components/auth/Edit"
require("dotenv").config();
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
        {/* <Navbar
          userInSession={this.state.loggedInUser}
          updateUser={this.updateLoggedInUser}
        /> */}
        <Header
          userInSession={this.state.loggedInUser}
          updateUser={this.updateLoggedInUser}
        />
        <Router forceRefresh={true}/>
        <Switch>
       
          <Route
            exact
            path="/signup"
            render={(props) => (
              <Signup updateUser={this.updateLoggedInUser} {...props} />
            )}
          />
          <Route
            exact
            path="/login"
            render={() => (
              <Login
                updateUser={this.updateLoggedInUser}
                userInSession={this.state.loggedInUser}
              />
            )}
          />
          <Route
            exact
            path="/logout"
            render={() => <Login updateUser={this.updateUser} />}
          />
          <Route
            exact
            path="/home"
            render={() => <Home userInSession={this.state.loggedInUser} />}
          />

          <Route exact path="/about" component={About} />
          <Route exact path="/games" component={ListGames} />
          <Route
            exact
            path="/games/:id"
            render={(props) => (
              <DetailsGame userInSession={this.state.loggedInUser} {...props} />
            )}
          />
          <Route exact path="/addgame" component={AddGame} />
          <Route
            exact
            path="/games/edit/:id"
            render={(props) => (
              <EditGame userInSession={this.state.loggedInUser} {...props} />
            )}
          />
          <Route exact path="/viewprofil/:id" render={(props) => (
              <ViewProfile userInSession={this.state.loggedInUser} {...props} />
            )}/>
            <Route exact path="/editprofil/:id" render={(props) => (
              <Edit userInSession={this.state.loggedInUser} {...props} />
            )}/>
          {/* <Route exact path="/stream" component={ComponentTwitch}/> */}
          <Route exact path="/stream" component={Games} />
          <Route exact path="/stream/top-streams" component={TopStreams} />
          <Route exact path="/stream/live/:slug" component={Live} />
          <Route exact path="/stream/game/:slug" component={GameStreams} />
          <Route exact path="/stream/resultats/:slug" component={Resultats} />
          <Route exact path="/stream/resultats/" component={Erreur} />
        </Switch>
      </div>
      
    );
  }
}

export default App;
