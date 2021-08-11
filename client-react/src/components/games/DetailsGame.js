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
    userConnect: this.props.userInSession,
    game: false,
    id: this.props.match.params.id,
    admin: this.props.userInSession?.admin,
    err: null,
    open: false,
  };

  componentDidMount() {
    detailofGame(this.state.id)
      .then((game) => {
        this.setState({ game: game });
      })
      .catch((err) => {
        window.location.replace("/modal");
      });
  }
  deleteGameInOurDB = (id) => {
    console.log("id du jeux", id);
    deleteGame(id)
      .then((response) => {
        this.props.history.push("/listgames");
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
  toggle = () => {
    this.setState({ open: !this.state.open });
  };
  render(props) {
    return (
      // (!this.props.userInSession?.username && <Redirect to="/modal" />) ||
      (!this.state.game && <h1>Loading...</h1>) || (
        <div className="single-game">
          <div style={styles.container}>
            <div className="backGround" style={styles.background}>
              <ReactPlayer
                height="auto"
                width="100%"
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
              <div className="packButtons" style={styles.packButtons}>
                <Link
                  style={styles.lienButton}
                  to={{ pathname: `${this.state.game.game_url}` }}
                  target="_blank"
                >
                  <button style={styles.button}>Jouer</button>
                </Link>
                {/* <button style={styles.button}>
                Ajouter/Supprimer aux favoris
              </button> */}
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
                    <Link
                      style={styles.lienButton}
                      to={{ pathname: `/games/edit/${this.state.id}` }}
                    >
                      <button style={styles.button}>Modifier</button>
                    </Link>
                  </>
                )}
              </div>
              <div className="tousCadres">
                <div className="infoAddi" style={styles.cadreOne}>
                  <h3 style={styles.h3}>Information additionnelles</h3>
                  <div style={styles.descriptif}>
                    <div className="grille" style={grid.cadreTwo}>
                      <p style={grid.one}>Développeur :</p>
                      <p style={grid.two}>{this.state.game.developer}</p>
                      <p style={grid.three}>Éditeur :</p>
                      <p style={grid.four}>{this.state.game.publisher}</p>
                      <p style={grid.five}>Plateforme :</p>
                      <p style={grid.six}>{this.state.game.platform}</p>
                      <p style={grid.seven}>Date de sortie :</p>
                      <p style={grid.eight}>{this.state.game.release_date}</p>
                      <p style={grid.nine}>Catégorie :</p>
                      <p style={grid.ten}>{this.state.game.genre}</p>
                    </div>
                  </div>
                </div>
                <div className="packImage" style={styles.flexImage}>
                  {this.state.game.screenshots.map((scrennShoot, i) => {
                    return (
                      <div key={scrennShoot.id}>
                        <img
                          style={styles.image}
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
                    <div className="grille" style={grid.cadreTwo}>
                      <p style={grid.one}>OS:</p>
                      <p style={grid.two}>
                        {this.state.game.minimum_system_requirements.os}
                      </p>
                      <p style={grid.three}>Processeur :</p>
                      <p style={grid.four}>
                        {this.state.game.minimum_system_requirements.processor}
                      </p>
                      <p style={grid.five}>Stockage :</p>
                      <p style={grid.six}>
                        {this.state.game.minimum_system_requirements.storage}
                      </p>
                      <p style={grid.seven}>Mémoire :</p>
                      <p style={grid.eight}>
                        {this.state.game.minimum_system_requirements.memory}
                      </p>
                      <p style={grid.nine}>Graphique :</p>
                      <p style={grid.ten}>
                        {this.state.game.minimum_system_requirements.graphics}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <Comment {...this.props} />
                {this.state.game.reviews.map((review, i) => {
                  return (
                    <div key={review._id} style={design.comment}>
                      <div className="underComment" style={design.underComment}>
                        <img
                          style={design.avatar}
                          src={review.user.image}
                          alt="avatar user"
                        />
                        <p style={design.username}>{review.user.username}</p>
                        <div className="ratingStars" style={design.posiOne}>
                          <ReactStars
                            color="#212529"
                            activeColor="#2ecc71"
                            size={50}
                            value={review.note}
                            edit={false}
                          />
                        </div>
                        <p style={design.message}>{review.message}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
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
  background: {
    backgroundColor: "#212529",
    height: "auto",
    width: "80%",
    alignItems: "center",
  },
  affiche: {
    marginTop: "100px",
    height: "auto",
    width: "50%",
    border: "3px solid #2ecc71",
    borderRadius: "10px",
  },
  flexImage: {
    marginTop: "100px",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    height: "auto",
    width: "500px",
    position: "relative",
    margin: "20px",
    border: "3px solid #2ecc71",
    borderRadius: "10px",
  },
  h3: {
    fontSize: "30px",
    fontWeight: "bold",
    color: "#2ecc71",
    marginTop: "25px",
  },
  descriptif: {
    marginTop: "25px",
    fontSize: "20px",
    fontWeight: "300",
    color: "#2ecc71",
    textAlign: "left",
  },
  packButtons: {
    marginTop: "100px",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    margin: "10px",
    height: "50px",
    width: "200px",
    textDecoration: "none",
    border: "3px solid #2ecc71",
    borderRadius: "5px",
    padding: "10px",
    backgroundColor: "#212529",
    color: "#2ecc71",
    cursor: "pointer",
  },
  lienButton: {
    textDecoration: "none",
  },
  cadreOne: {
    marginTop: "50px",
    padding: "20px",
    height: "auto",
    width: "80%px",
    alignItems: "center",
    backgroundColor: "#212529",
    // border: "3px solid #2ecc71",
    // borderRadius: "5px",
  },
};

const grid = {
  cadreTwo: {
    display: "grid",
    gridTemplate: "repeat(5, 50px) / 1fr 1fr",
    // border: "3px solid #2ecc71",
    // borderRadius: "5px",
  },
  one: {
    gridArea: "1 / 1 / 2 / 2",
    textAlign: "center",
  },
  two: {
    gridArea: "1 / 2 / 2 / 3",
    textAlign: "center",
  },
  three: {
    gridArea: "2 / 1 / 3 / 2",
    textAlign: "center",
  },
  four: {
    gridArea: "2 / 2 / 3 / 3",
    textAlign: "center",
  },
  five: {
    gridArea: "3 / 1 / 4 / 2",
    textAlign: "center",
  },
  six: {
    gridArea: "3 / 2 / 4 / 3",
    textAlign: "center",
  },
  seven: {
    gridArea: "4 / 1 / 5 / 2",
    textAlign: "center",
  },
  eight: {
    gridArea: "4 / 2 / 5 / 3",
    textAlign: "center",
  },
  nine: {
    gridArea: "5 / 1 / 6 / 2",
    textAlign: "center",
  },
  ten: {
    gridArea: "5 / 2 / 6 / 3",
    textAlign: "center",
  },
};

const design = {
  comment: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  underComment: {
    display: "grid",
    gridTemplate: "repeat(2, 100px) / 1fr 1fr",
    height: "200px",
    width: "80%",
    margin: "50px",
    border: "3px solid #2ecc71",
    borderRadius: "5px",
    backgroundColor: "#212529",
    color: "#2ecc71",
  },
  avatar: {
    minHeight: "200px",
    maxWidth: "150px",
    gridArea: "1 / 1 / 2 / 2",
  },
  username: {
    margin: "0px",
    fontSize: "30px",
    color: "#2ecc71",
    gridArea: "1 / 1 / 2 / 2",
    textAlign: "left",
    marginTop: "3vh",
    marginLeft: "10vw",
  },
  posiOne: {
    gridArea: "1 / 2 / 2 / 3",
    marginTop: "1vh",
    marginLeft: "20vw",
  },
  message: {
    gridArea: "2 / 1 / 2 / 3",
    textAlign: "left",
    marginTop: "3vh",
    marginLeft: "10vw",
  },
};

export default DetailsGame;
