import React, { Component } from "react";
import Comment from "./reviews/Comment";
import { detailofGame } from "./game-service";
import ReactPlayer from 'react-player'
class DetailsGame extends Component {
  state = {
    game: false,
    id: this.props.match.params.id,
  };

  componentDidMount() {
    detailofGame(this.state.id)
      
      .then((game) => {
        console.log(game);
        this.setState({ game: game });
      })
      .catch((err) => console.log("err lor du chargement", err));
  }
  render() {
    return (
      (!this.state.game && <h1>Loading...</h1>) || (
        <div className="single-game">
          {/* <video autoPlay loop>
            <source src={this.state.game.trailer} />
            Your browser does not support the video tag.
          </video> */}
          <ReactPlayer url={this.state.game.trailer} loop playing />

          <img src={this.state.game.thumbnail} alt="game" />
          <h3>{this.state.game.title}</h3>
          <p>{this.state.game.description}</p>
          <button onClick={this.state.game.game_url}>Jouer</button>
          <button>Ajouter/Supprimer auw favoris </button>
          <div>
            <h3>Information additionnelles</h3>
            <p>Développeur:</p>
            <p>{this.state.developer}</p>
            <p>Éditeur</p>
            <p>{this.state.publisher}</p>
          </div>
          <Comment />
        </div>
      )
    );
  }
}

export default DetailsGame;
