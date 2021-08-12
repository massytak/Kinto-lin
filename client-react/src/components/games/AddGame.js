import React, { Component } from "react";
import axios from "axios";
import { addGametoData } from "./game-service";
import '../../Styling/addGame.css'
require("dotenv").config();

class AddGame extends Component {
  state = {
    gamesFromApi: null,
    query: "",
    err: null,
    addedgame: null,
    correct: null,
  };
  componentDidMount() {
    var options = {
      method: "GET",
      url: "https://free-to-play-games-database.p.rapidapi.com/api/games",
      headers: {
        "x-rapidapi-key": "499827b900msh876b2bc0c07a502p1c0d87jsn96b8e26f9571",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
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
        
        this.setState({
          addedgame: titlesearch,
          correct: `${titlesearch} a été ajouter dans la base de donnée`,
        });
        setTimeout(() => {
          this.setState({
            correct: null,
          });
        }, 3000);
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
      paddingTop:"1em",
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "center",
    };
    const sectionStyle = {
      textAlign: "center",
      margin: "1em 1.2em",

      border: "2px solid red",
      borderRadius: "5px",
    };
   
    const pStyles = {
      margin: "0",
      textAlign: "center",
      paddingTop:"1em",
      zIndex:"10",
      position: "sticky",
      top: "3em",
      backgroundColor:"#2c3e50",
      paddingBottom:"1.2em",
      color:"aliceblue"
    };
    const pStyle = {
      margin: "0",
      textAlign: "center",
    };
    const imgStyle = {
      aspectRatio: "auto",
      width: "100%",
    };
    const addedStyle = {
      margin: "0",
      textAlign: "center",
      color: "#2ecc71",
    };
    const notAddedStyle = {
      margin: "0",
      textAlign: "center",
      color: "red",
    };
    const divcompenenteStyle = {
      paddingTop: "3em",
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
      <div style={divcompenenteStyle}>
        <div style={pStyles}>
          <h2>Add game</h2>
          <input
            type="text"
            name=""
            value={this.state.name}
            onChange={(e) => this.handelFilter(e)}
          />
          <p style={addedStyle}>{this.state.correct}</p>
        <p style={notAddedStyle}>{this.state.err}</p>
        </div>

        
        <div style={divStyle}>
          {!this.state.gamesFromApi ? (
            <p>Loading...</p>
          ) : (
            games.map((e) => {
              return (
                <section className="carteGamesa" key={e.id}>
                  <button
                  className="buttonStyle"
                   
                    onClick={() => this.addGameInOurData(e.title)}
                  >
                    Ajouter
                  </button>
                  <p style={pStyle}>{e.title}</p>
                  <img className="imgCartea"  src={e.thumbnail} alt="img du jeux" />
                </section>
              );
            })
          )}
        </div>
      </div>
    );
  }
}

export default AddGame;
