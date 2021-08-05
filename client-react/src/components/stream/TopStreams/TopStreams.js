import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import { getTopstream } from "../stream-service";
import { getStreamer } from "../stream-service";
import { getGame } from "../stream-service";
function TopStreams() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    
    getTopstream()
      .then((result) => {
        let dataArray = result.data;
        

        let gameIDs = dataArray.map((stream) => {
          return stream.game_id;
        });
        let userIDs = dataArray.map((stream) => {
          return stream.user_id;
        });
        // console.log(gameIDs, userIDs);

        // Création des URLs personnalisés
        // let baseUrlGames = "https://api.twitch.tv/helix/games?";
        // let baseUrlUsers = "https://api.twitch.tv/helix/users?";

        let queryParamsGames = "";
        let queryParamsUsers = "";

        gameIDs.map((id) => {
          return (queryParamsGames = queryParamsGames + `id=${id}&`);
        });
        userIDs.map((id) => {
          return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
        });

        // URL final : coller tous les IDs avec leur URL respectif
        let urlFinalGames = queryParamsGames.substr(3);
        let urlFinalUsers = queryParamsUsers.substr(3);
        // console.log(urlFinalGames, urlFinalUsers);

        //appel
        getGame(urlFinalGames)
          .then((gamesNames) => {
            getStreamer(urlFinalUsers)
            .then((getUsers) => {
              //isoler les data.data
              
              let gamesNameArray = gamesNames.data;
              let arrayUsers = getUsers.data;
              // console.log(gamesNameArray, arrayUsers);

              // création tableau final
              let finalArray = dataArray.map((stream) => {
                stream.gameName = "";
                stream.login = "";

                gamesNameArray.forEach((name) => {
                  arrayUsers.forEach((user) => {
                    if (
                      stream.user_id === user.id &&
                      stream.game_id === name.id
                    ) {
                      stream.truePic = user.profile_image_url;
                      stream.gameName = name.name;
                      stream.login = user.login;
                    }
                  });
                });

                let newUrl = stream.thumbnail_url
                  .replace("{width}", "320")
                  .replace("{height}", "180");
                stream.thumbnail_url = newUrl;

                return stream;
              });
              setChannels(finalArray);
            });
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
    
  });
 
  return (
    <div>
      <Sidebar />
      <h1 className="titreGames">Streams les plus populaires</h1>
      <div className="flexAccueil">
        {channels.map((channel, index) => (
          <div key={index} className="carteStream">
            <img src={channel.thumbnail_url} alt="jeu" className="imgCarte" />
            <div className="cardBodyStream">
              <h5 className="titreCartesStream">{channel.user_name}</h5>
              <p className="txtStream">Jeu : {channel.gameName}</p>
              <p className="txtStream viewers">
                Viewers : {channel.viewer_count}
              </p>
              <Link
                className="lien"
                to={{
                  pathname: `/stream/live/${channel.login}`,
                }}
              >
                <div className="btnCarte">Regarder {channel.user_name}</div>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TopStreams;
