import React from 'react'
import "../../Styling/twitch.css";
import Header from "./Header/Header";
import Sidebar from "./Sidebar/Sidebar";
import Games from "./Games/Games";
import TopStreams from "./TopStreams/TopStreams";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Live from "./Live/Live";
import GameStreams from "./GameStreams/GameStreams";
import Resultats from "./Resultats/Resultats";
import Erreur from "./Erreur/Erreur";

 function ComponentTwitch() {
  return (
    <div>
      <Router forceRefresh={true}>
      <div className="App">
        <Header />
        <Sidebar />

        <Switch>
          <Route exact path="/stream/" component={Games} />
          <Route exact path="/stream/top-streams" component={TopStreams} />
          <Route exact path="/stream/live/:slug" component={Live} />
          <Route exact path="/stream/game/:slug" component={GameStreams} />
          <Route exact path="/stream/resultats/:slug" component={Resultats} />
          <Route exact path="/stream/resultats/" component={Erreur} />
        </Switch>
      </div>
    </Router>
    </div>
  )
}
export default ComponentTwitch