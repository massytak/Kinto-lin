import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listofGames } from "./game-service";

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
              type="search"
              name=""
              value={this.state.query}
              onChange={this.handleQuery}
            />
          </div>
          {
            (!games.length ? (
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
            ))
          }
        </>
      ))
    );
  }
}

export default ListGames;
