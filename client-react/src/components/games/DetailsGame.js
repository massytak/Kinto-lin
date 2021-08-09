import React, { Component } from "react";
import Comment from "./reviews/Comment";
import { detailofGame } from "./game-service";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import { deleteGame } from "./game-service";
import "../../Styling/detailsGame.css";
class DetailsGame extends Component {
  state = {
    game: false,
    id: this.props.match.params.id,
    admin: this.props.userInSession?.admin,
    err: null,
  };

  componentDidMount() {
    detailofGame(this.state.id)
      .then((game) => {
        this.setState({ game: game });
      })
      .catch((err) => console.log("err lors du chargement", err));
  }
  deleteGameInOurDB = (id) => {
    console.log("id du jeux", id);
    deleteGame(id)
      .then((response) => {
        this.props.history.push("/games");
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
  render(props) {
    return (
      (!this.state.game && <h1>Loading...</h1>) || (
        <div className="single-game">
          <div style={styles.container}>
            <ReactPlayer
              style={styles.video}
              url={this.state.game.trailer}
              playing
              loop
            />

            <img
              style={styles.affiche}
              src={this.state.game.thumbnail}
              alt="game"
            />
            <div style={styles.cadreOne}>
              <h3 style={styles.h3}>{this.state.game.title}</h3>
              <p style={styles.descriptif}>{this.state.game.description}</p>
            </div>
            <Link
              to={{ pathname: `${this.state.game.game_url}` }}
              target="_blank"
            >
              <button style={styles.button}>Jouer</button>
            </Link>
            <button style={styles.button}>Ajouter/Supprimer aux favoris</button>
            {this.state.admin && (
              <>
                <button
                  style={styles.button}
                  onClick={() => {
                    this.deleteGameInOurDB(this.state.id);
                  }}
                >
                  Supprimer
                </button>
                <Link to={{ pathname: `/games/edit/${this.state.id}` }}>
                  <button style={styles.button}>Modifier</button>
                </Link>
              </>
            )}

            <div className="tousCadres">
              <div className="infoAddi" style={styles.cadreOne}>
                <h3 style={styles.h3}>Information additionnelles</h3>
                <div style={styles.descriptif}>
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
                </div>
              </div>
              <div className="imagesGames">
                {this.state.game.screenshots.map((scrennShoot, i) => {
                  return (
                    <div key={scrennShoot.id}>
                      <img
                        style={stylesImages.image}
                        src={scrennShoot.image}
                        alt="screen"
                      />
                    </div>
                  );
                })}
              </div>
              <div className="configMin" style={styles.cadreOne}>
                <h3 style={styles.h3}>Configuration minimale requise</h3>
                <div style={styles.descriptif}>
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
            </div>
          </div>
          <div>
            <Comment {...this.props} />
            {this.state.game.reviews.map((review, i) => {
              return (
                <div key={review._id}>
                  <img src={review.user.image} alt="avatar user" />
                  <p>{review.user.username}</p>
                  <ReactStars
                    color="#212529"
                    activeColor="#2ecc71"
                    size={50}
                    value={review.note}
                    edit={false}
                  />
                  <p>{review.message}</p>
                </div>
              );
            })}
          </div>
        </div>
      )
    );
  }
}

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  video: {
    marginTop: "100px",
    border: "10px solid #2ecc71",
    borderRadius: "5px",
  },
  affiche: {
    marginTop: "100px",
    height: "auto",
    width: "500px",
    border: "10px solid #2ecc71",
    borderRadius: "5px",
  },
  h3: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
  },
  descriptif: {
    marginTop: "30px",
    fontSize: "20px",
    fontWeight: "300",
    color: "#2ecc71",
  },
  button: {
    margin: "10px",
    height: "50px",
    width: "200px",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #2C3E50",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#212529",
    color: "#fff",
    cursor: "pointer",
  },
  cadreOne: {
    marginTop: "100px",
    padding: "20px",
    height: "auto",
    width: "800px",
    border: "10px solid #2ecc71",
    borderRadius: "5px",
    backgroundColor: "#212529",
  },
};

const stylesImages = {
  image: {
    height: "auto",
    width: "500px",
    display: "flex",
    justifyContent: "spaceEvenly",
    alignItems: "center",
    flexDirection: "raw",
    border: "10px solid #2ecc71",
    borderRadius: "5px",
  },
};

export default DetailsGame;
