import React, { useState, useEffect } from "react";
// useState permet d'avoir du state dans un composant de type fonction.
// useEffect permet de faire appel à l'API.
// import api from "../api";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { getTopGame } from "../stream-service";
function Games() {
  // premiere valeur = valeur du state
  // seconde valeur = fonction qui peut mettre à jour le state
  // useState = valeur initiale à 0 (on peut mettre d'autre valeur)
  const [games, setGames] = useState([]);

  useEffect(() => {
    ///////////pour la route twitch /stream/games////
    getTopGame()
      .then((result) => {
        
        let dataArray = result.data;
        let finalArray = dataArray.map((game) => {
          let newUrl = game.box_art_url
            .replace("{width}", "250")
            .replace("{height}", "300");
          game.box_art_url = newUrl;
          return game;
        });
        setGames(finalArray);
      })
      .catch((err) => console.log(err));
  });

  return (
    <div>
      <Sidebar />
      <h1 className="titreGames">Jeux les plus populaires</h1>
      <div className="flexAccueil">
        {games.map((game, index) => (
          <div key={index} className="carteGames">
            <img
              src={game.box_art_url}
              alt="jeu profile pic"
              className="imgCarte"
            />
            <div className="cardBodyGames">
              <h5 className="titreCartesGames">{game.name}</h5>
              <Link
                className="lien"
                to={{
                  pathname: "/stream/game/" + game.name,
                  state: {
                    gameID: game.id,
                  },
                }}
              >
                <div className="btnCarte">Regarder {game.name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Games;
