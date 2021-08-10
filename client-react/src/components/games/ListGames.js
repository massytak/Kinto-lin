import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listofGames } from "./game-service";
import Select from "react-select";
const options = [
  { value: "PC", label: "PC" },
  { value: "WEB", label: "WEB" },
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
  render() {
    const divstyle = {
      paddingTop: "4em",
    };
    const divInputstyle = {
      display: "flex",
      flexDirection: "row",
      justifyContent:"space-around",
      paddingTop:"1.2em"
    
    };
    const widthInput = {
      minWidth: "300px",
    };
    const customStyles = {
      menu: (provided, state) => ({
        ...provided,
        width: state.selectProps.width,
        borderBottom: "1px dotted pink",
        color: state.selectProps.menuColor,
        padding: 20,
        
      }),

      control: (_, { selectProps: { width } }) => ({
        width: 300,
        backgroundColor: '#2ecc71',
        borderRadius: "10px"

      }),

      singleValue: (provided, state) => {
        const opacity = state.isDisabled ? 0.5 : 1;
        const transition = "opacity 300ms";
        const color="black"
        return { ...provided, opacity, transition,color };
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
    return (
      (!this.state.games && <h1 style={divstyle}>Loading...</h1>) ||
      (this.state.games && (
        <>
          <div style={divstyle}>
            <label>Search your game : </label>
            <input
              style={widthInput}
              type="search"
              name=""
              value={this.state.query}
              onChange={this.handleQuery}
            />
          </div>
          <div style={divInputstyle}>
            <label>genre:</label>
            <Select
              styles={customStyles}
             
              placeholder={this.state.genre}
              name="genre"
              value={this.state.genre}
              onChange={(e) => this.handleSelectChange(e)}
              options={options1}
            />
            <label>genre:</label>
            <Select
            styles={customStyles}
             
              placeholder={this.state.genre}
              name="genre"
              value={this.state.genre}
              onChange={(e) => this.handleSelectChange(e)}
              options={options}
            />
            <label>genre:</label>
            <Select
            styles={customStyles}
              placeholder={this.state.genre}
              name="genre"
              value={this.state.genre}
              onChange={(e) => this.handleSelectChange(e)}
              options={options2}
            />
          </div>
          {!games.length ? (
            <p>Oups there are note game with this name</p>
          ) : (
            games.map((game, i) => {
              return (
                <div style={divstyle}>
                  <Link key={game._id} to={`/game/${game._id}`}>
                    <div key={game._id} className="item-beer">
                      <img src={game.thumbnail} alt="beer" />
                      <div>
                        <h2>{game.title}</h2>
                        <p>{game.short_description}</p>
                        <p>{game.genre}</p>
                        <p>{game.platform}</p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })
          )}
        </>
      ))
    );
  }
}

export default ListGames;
