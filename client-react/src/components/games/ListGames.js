import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listofGames } from "./game-service";
import Select from "react-select";

import "../../Styling/listGame.css";
const options = [
  { value: "PC (Windows)", label: "PC" },
  { value: "Web Browser", label: "WEB" },
  { value: "All", label: "All" },
];
const options1 = [
  { value: "All", label: "All" },
  { value: "Card games", label: "Card games" },
  { value: "MMO", label: "MMO" },
  { value: "MMORPG", label: "MMORPG" },
  { value: "MOBA ", label: "MOBA " },
  { value: "Racing ", label: "Racing " },
  { value: "Social", label: "Social" },
  { value: "Shooter", label: "Shooter" },
  { value: "Sports ", label: "Sports " },
  { value: "Strategy ", label: "Strategy " },
  { value: "Fighting", label: "Fighting" },
];
const options2 = [
  { value: "Release date", label: "Release date" },
  { value: "Alphabetical", label: "Alphabetical" },
];
class ListGames extends Component {
  state = {
    games: null,
    query: "",
    sort: "All",
    plateforme: options[2].value,
    catégorie: options1[0].value,
  };
  componentDidMount() {
    listofGames()
      .then((allGames) => {
        console.log("allgames", allGames);
        this.setState({ games: allGames });
      })
      .catch((err) => console.log(err));
  }
  handleQuery = (ev) => {
    this.setState({
      query: ev.target.value,
    });
  };
  handleSelectChangePlatform = (selectedOption) => {
    if (this.state.plateforme === "All") {
      this.setState({ games: this.state.games });
    }
    this.setState({ plateforme: selectedOption.value });
  };
  handleSelectChangeCategory = (selectedOption) => {
    if (this.state.catégorie === "All") {
      this.setState({ games: this.state.games });
    }
    this.setState({ catégorie: selectedOption.value });
  };
  handleSelectChangeSort = (selectedOption) => {
    this.setState({ sort: selectedOption.value });
  };
  render() {
    const divstyle = {
      paddingTop: "4em",
    };
    const divInputstyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-around",
      paddingTop: "1.2em",
      color:"black"
    };
    
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        
        borderBottom: "1px dotted pink",
        color: state.selectProps.menuColor,
        padding: 20,
        color:"black"
      }),

      control: (_, { selectProps: { width } }) => ({
        width: 300,
        height:50,
        backgroundColor: "#2ecc71",
        borderRadius: "10px",
        display: "inline-flex",
        color:"black"
      }),

      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color = "black";
        const currentColor="black"
        return { ...provided, opacity, transition, color ,currentColor};
      },
    };

    let games = this.state.games;
    const query = this.state.query;
    var newsentence = query.charAt(0).toUpperCase();
    // Filter `foods` with `query`
    for (let i = 1; i < query.length; i++) {
      newsentence += query.charAt(i).toLowerCase();
    }
    if (newsentence) {
      games = games.filter((game) => game.title.includes(newsentence));
    }

    if (this.state.sort === "Alphabetical") {
      games.sort((a, b) => {
        if (a.title < b.title) {
          return -1;
        }
        if (a.title > b.title) {
          return 1;
        }
        return 0;
      });
    }
    if (this.state.sort === "Release date") {
      console.log(this.state.sort);
      games.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });
    }

    if (this.state.plateforme !== "All") {
      console.log(this.state.plateforme);
      let filterOne = this.state.plateforme;
      games = games.filter((game) => game.platform === `${filterOne}`);
    }
    if (this.state.catégorie !== "All") {
      console.log(this.state.catégorie);
      let filterOne = this.state.catégorie;
      games = games.filter((game) => game.genre === `${filterOne}`);
    }
    return (
      (!this.state.games && <h1 style={divstyle}>Loading...</h1>) ||
      (this.state.games && (
        <div
          containerWidth={this.props.containerWidth}
          containerHeight={this.props.containerHeight}
        >
          <div className="searchDiv">
            <div style={divstyle}>
              <input
              className="inputRecherchegame"
                placeholder="Search your game"
                
                type="search"
                name=""
                value={this.state.query}
                onChange={this.handleQuery}
              />
            </div>
            <div style={divInputstyle}>
              <Select
              
                styles={customStyles}
                placeholder={`Category : ${this.state.catégorie}`}
                name="catégorie"
                value={this.state.catégorie}
                onChange={(e) => this.handleSelectChangeCategory(e)}
                options={options1}
              />

              <Select
              className="sidebarr"
                styles={customStyles}
                placeholder={`Platform : ${this.state.plateforme}`}
                name="plateforme"
                value={this.state.plateforme}
                onChange={(e) => this.handleSelectChangePlatform(e)}
                options={options}
              />

              <Select
               className="sidebarr"
                styles={customStyles}
                placeholder={`Sort by : ${this.state.sort}`}
                name="sort"
                value={this.state.sort}
                onChange={(e) => this.handleSelectChangeSort(e)}
                options={options2}
              />
            </div>
          </div>
          <div className="flexAccueil">
            {!games.length ? (
              <p>Oups there are note game with this name</p>
            ) : (
              games.map((game, i) => {
                return (
                  <div className="carteGames">
                    <Link
                      className="lien"
                      key={game._id}
                      to={`/game/${game._id}`}
                    >
                      <div key={game._id} className="item-beer">
                        <img
                          src={game.thumbnail}
                          alt="beer"
                          className="imgCarte"
                        />
                        <div className="cardBodyGames">
                          <h2 className="titreCartesGames">{game.title}</h2>
                          <p>{game.short_description}</p>
                          <div className="genrePlatform">
                            <p>{game.genre}</p>
                            <p>{game.platform}</p>
                          </div>
                        </div>
                          
                      </div>
                    </Link>
                  </div>
                );
              })
            )}
          </div>
        </div>
      ))
    );
  }
}

export default ListGames;
