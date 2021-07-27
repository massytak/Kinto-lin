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
          <h3>Information additionnelles</h3>
          <div>
            
            <p>Développeur:</p>
            <p>{this.state.game.developer}</p>
            <p>Éditeur</p>
            <p>{this.state.game.publisher}</p>
            <p>Plateforme:</p>
            <p>{this.state.game.platform}</p>
            <p>Date de sortie:</p>
            <p>{this.state.game.release_date}</p>
            <p>Catégorie:</p>
            <p>{this.state.game.genre}</p>
            <div>
            {
              this.state.game.screenshots.map((scrennShoot,i)=>{return(

                <img key={scrennShoot.id} src={scrennShoot.image} alt='screen'/>
              )
              })
            }

            </div>
            <h3>Configuration minimale requise</h3>
            <div>
              <p>OS:</p>
              <p>{this.state.game.minimum_system_requirements.os}</p>
              <p>Processeur:</p>
              <p>{this.state.game.minimum_system_requirements.processor}</p>
              <p>Stockage:</p>
              <p>{this.state.game.minimum_system_requirements.storage}</p>
              <p>Mémoire:</p>
              <p>{this.state.game.minimum_system_requirements.memory}</p>
              <p>Graphique:</p>
              <p>{this.state.game.minimum_system_requirements.graphics}</p>
            </div>
          </div>
          <div>
          <Comment />
          {this.state.game.reviews.map()}
          </div>

        </div>
      )
    );
  }
}

export default DetailsGame;
