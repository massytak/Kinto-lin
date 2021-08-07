import React, { useState, useEffect } from "react";
// import api from "../api";
import { Link } from "react-router-dom";
import { getTopstream } from "../stream-service";
import { getGame } from "../stream-service";
import { getStreamer } from "../stream-service";
function Sidebar() {
  const [topStreams, setTopStreams] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     const result = await api.get("https://api.twitch.tv/helix/streams");

  //     let dataArray = result.data.data;
  //     // console.log(dataArray);

  //     let gameIDs = dataArray.map((stream) => {
  //       return stream.game_id;
  //     });
  //     let userIDs = dataArray.map((stream) => {
  //       return stream.user_id;
  //     });
  //     // console.log(gameIDs, userIDs);

  //     // Création des URLs personnalisés
  //     let baseUrlGames = "https://api.twitch.tv/helix/games?";
  //     let baseUrlUsers = "https://api.twitch.tv/helix/users?";

  //     let queryParamsGames = "";
  //     let queryParamsUsers = "";

  //     gameIDs.map((id) => {
  //       return (queryParamsGames = queryParamsGames + `id=${id}&`);
  //     });
  //     userIDs.map((id) => {
  //       return (queryParamsUsers = queryParamsUsers + `id=${id}&`);
  //     });

  //     // URL final : coller tous les IDs avec leur URL respectif
  //     let urlFinalGames = baseUrlGames + queryParamsGames;
  //     let urlFinalUsers = baseUrlUsers + queryParamsUsers;
  //     // console.log(urlFinalGames, urlFinalUsers);

  //     //appel
  //     let gamesNames = await api.get(urlFinalGames);
  //     let getUsers = await api.get(urlFinalUsers);

  //     //isoler les data.data
  //     let gamesNameArray = gamesNames.data.data;
  //     let arrayUsers = getUsers.data.data;
  //     // console.log(gamesNameArray, arrayUsers);

  //     // création tableau final
  //     let finalArray = dataArray.map((stream) => {
  //       stream.gameName = "";
  //       stream.truePic = "";
  //       stream.login = "";

  //       gamesNameArray.forEach((name) => {
  //         arrayUsers.forEach((user) => {
  //           if (stream.user_id === user.id && stream.game_id === name.id) {
  //             stream.truePic = user.profile_image_url;
  //             stream.gameName = name.name;
  //             stream.login = user.login;
  //           }
  //         });
  //       });
  //       return stream;
  //     });
  //     setTopStreams(finalArray.slice(0, 6));
  //   };

  //   fetchData();
  // }, []);
  // console.log(topStreams);
  useEffect(() => {
    getTopstream()
      .then((result) => {
        let dataArray = result.data;

        let resultgameIDs = dataArray.map((stream) => {
          return stream.game_id;
        });
        let resultuserIDs = dataArray.map((stream) => {
          return stream.user_id;
        });
        let gameIDs=resultgameIDs.filter(game=>game)
        let userIDs=resultuserIDs.filter(user=>user)
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

        //appel
        getGame(urlFinalGames)
          .then((gamesNames) => {
            getStreamer(urlFinalUsers)
              .then((getUsers) => {
                //isoler les data.data
                // console.log("getUsers", getUsers.data);
                let gamesNameArray = gamesNames.data;
                let arrayUsers = getUsers.data;
                // console.log(gamesNameArray, arrayUsers);

                // création tableau final
                let finalArray = dataArray.map((stream) => {
                  stream.gameName = "";
                  stream.truePic = "";
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
                  return stream;
                });
                setTopStreams(finalArray.slice(0, 6));
              })
              .catch((err) => console.log(err));
          })

          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  });

  return (
    <div className="sidebar">
      <h2 className="titreSidebar">Chaînes recommandées</h2>
      <ul className="listeStream">
        {topStreams.map((stream, index) => (
          <Link
            key={index}
            className="lien"
            to={{
              pathname: `/stream/live/${stream.login}`,
            }}
          >
            <li key={index} className="containerFlexSidebar">
              <img
                src={stream.truePic}
                alt="logo user"
                className="profilePicRonde"
              />
              <div className="streamUser">{stream.user_name}</div>
              <div className="viewerRight">
                <div className="pointRouge"></div>
                <div>{stream.viewer_count}</div>
              </div>
              <div className="gameNameSidebar">{stream.gameName}</div>
            </li>
          </Link>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;