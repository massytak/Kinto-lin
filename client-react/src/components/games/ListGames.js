import React, { Component } from "react";
import { Link } from "react-router-dom";
import { listofGames } from "./game-service";


class ListGames extends Component {
  state = {
    games: null,
  };
  componentDidMount() {
    listofGames()
      .then((allGames) => {
        console.log("allgames",allGames);
        this.setState({ games: allGames });
      })
      .catch((err) => console.log(err));
  }

  render() {
    return (
      (!this.state.games && <h1>Loading...</h1>) ||
      this.state.games.map((game, i) => {
        return (
          <Link key={game._id} to={`/games/${game._id}`}>
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
        );
      })
    );
  }
}

export default ListGames;
