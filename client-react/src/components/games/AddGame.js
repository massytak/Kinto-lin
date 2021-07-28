import React, { Component } from "react";
import axios from "axios";
require('dotenv').config()
class AddGame extends Component {
  state = {
    gamesFromApi: null,
  };
  componentDidMount() {
    var options = {
      method: 'GET',
      url: 'https://free-to-play-games-database.p.rapidapi.com/api/games',
      headers: {
        'x-rapidapi-key': process.env.REACT_APP_XAPIKEY,
        'x-rapidapi-host': process.env.REACT_APP_XAPIHOST
      }
    };
    
    axios.request(options).then(function (response) {
      console.log(response.data);
    }).catch(function (error) {
      console.error(error);
    });
  }

  render() {
    return (
      <div>
        <p>add game</p>
      </div>
    );
  }
}

export default AddGame;
