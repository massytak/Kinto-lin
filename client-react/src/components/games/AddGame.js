import React, { Component } from "react";
import axios from "axios";
import { addGametoData } from "./game-service";
require("dotenv").config();
class AddGame extends Component {
  state = {
    gamesFromApi: null,
    query: "",
    err: null,
    addedgame: null,
  };
  componentDidMount() {
    var options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "x-rapidapi-key": process.env.REACT_APP_XAPIKEY,
        "x-rapidapi-host": process.env.REACT_APP_XAPIHOST,
      },
    };

    axios
      .request(options)
      .then((response) => {
        this.setState({
          gamesFromApi: response.data,
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  }
  handelFilter = (event) => {
    let { name, value } = event.target;
    this.setState({ [name]: value, query: value });
  };

  addGameInOurData = (title) => {
    const titlesearch = title;
    addGametoData(titlesearch)
      .then((response) => {
        this.setState({ addedgame: titlesearch });
      })
      .catch((error) => {
        this.setState({ err: error.response.data.message });
        setTimeout(() => {
          this.setState({
            err: null,
          });
        }, 3000);
      });
  };

  render() {
    const query = this.state.query;
    let games = this.state.gamesFromApi;
    const sentence = this.state.query;
    var newsentence = sentence.charAt(0).toUpperCase();
    const divStyle = {
      color: "blue",
      display: "flex",
      flexDirection: "row",
    };
    for (let i = 1; i < sentence.length; i++) {
      newsentence += sentence.charAt(i).toLowerCase();
    }
    if (query) {
      games = games.filter((game) => {
        return game.title.startsWith(newsentence);
      });
    }
    return (
      <div>
        <input
          type="text"
          name=""
          value={this.state.name}
          onChange={(e) => this.handelFilter(e)}
        />
        {this.state.addedgame &&
          alert(`${this.state.addedgame} a été ajouter dans la base de donnée`)}
        <p>add game</p>
        <p>{this.state.err}</p>
        <div style={divStyle}>
          {!this.state.gamesFromApi ? (
            <p>Loading...</p>
          ) : (
            games.map((e) => {
              return (
                <div key={e._id}>
                  <button onClick={() => this.addGameInOurData(e.title)}>
                    Ajouter
                  </button>
                  <p>{e.title}</p>
                  <img src={e.thumbnail} alt="img du jeux" />
                </div>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default AddGame;
