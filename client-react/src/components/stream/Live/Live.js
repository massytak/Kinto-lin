import React, { useState, useEffect } from "react";
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import { useParams } from "react-router-dom";
// useParams permet d'utiliser le slug.
import api from "../api";
import Sidebar from "../Sidebar/Sidebar";
import { getLive } from "../stream-service";
import { getGame } from "../stream-service";

function Live() {
  let { slug } = useParams();
  // console.log(slug);

  const [infoStream, setInfoStream] = useState([]);
  const [infoGame, setInfoGame] = useState([]);

  useEffect(() => {
    getLive(slug)
      .then((result) => {
        // console.log(result);
        if (result.data.length === 0) {
          setInfoStream(false);
        } else {
          let gameID = result.data.map((gameid) => {
            return gameid.game_id;
          });
          getGame(gameID)
            .then((resultNomGame) => {
              let nomJeu = resultNomGame.data.map((gameName) => {
                return gameName.name;
              });
              setInfoGame(nomJeu);
              setInfoStream(result.data[0]);
            })
            .catch((err) => console.log(err));
          // const resultNomGame = api.get(
          //   `https://api.twitch.tv/helix/games?id=${gameID}`
          // );
          // console.log(resultNomGame);
        }
      })
      .catch((err) => console.log(err));
    // const fetchData = async () => {
    //   const result = await api.get(
    //     `https://api.twitch.tv/helix/streams?user_login=${slug}`
    //   );
    //   // console.log(result);
    //   if (result.data.data.length === 0) {
    //     setInfoStream(false);
    //   } else {
    //     let gameID = result.data.data.map((gameid) => {
    //       return gameid.game_id;
    //     });
    //     const resultNomGame = await api.get(
    //       `https://api.twitch.tv/helix/games?id=${gameID}`
    //     );
    //     // console.log(resultNomGame);
    //     let nomJeu = resultNomGame.data.data.map((gameName) => {
    //       return gameName.name;
    //     });
    //     setInfoGame(nomJeu);
    //     setInfoStream(result.data.data[0]);
    //   }
    // };
  });

  return infoStream ? (
    <>
      <Sidebar />
      <div className="containerDecale">
        <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
        <div className="contInfo">
          <div className="titreStream">
            Titre du stream : {infoStream.title}
          </div>
          <div className="viewer">Viewers : {infoStream.viewer_count}</div>
          <div className="infogame">
            Streamer : {infoStream.user_name}, &nbsp; Langue :{" "}
            {infoStream.language}
          </div>
          <div className="nomJeu">Jeu : {infoGame}</div>
        </div>
      </div>
    </>
  ) : (
    <>
    <Sidebar />
    <div className="containerDecale">
      <ReactTwitchEmbedVideo height="754" width="100%" channel={slug} />
      <div className="contInfo">
        <div className="titreStream">Le Streamer est offline ! </div>
      </div>
    </div>
    </>
  );
}

export default Live;
