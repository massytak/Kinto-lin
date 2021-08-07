import React, { useState, useEffect } from "react";
// import api from "../api";
import { Link, useParams } from "react-router-dom";
import Erreur from "../Erreur/Erreur";
import Sidebar from "../Sidebar/Sidebar";
import { searchTwitch } from "../stream-service";
function Resultats() {
  let { slug } = useParams();

  const [result, setResult] = useState(true);
  const [streamerInfo, setStreamerInfo] = useState([]);

  let cleanSearch = slug.replace(/ /g, "");

  useEffect(() => {
    searchTwitch(cleanSearch)
      .then((result) => {
        if (result.data.length === 0) {
          setResult(false);
        } else {
          setStreamerInfo(result.data);
        }
      })
      .catch((err) => console.log(err));
    // const fetchData = async () => {
    //   const result = await api.get(
    //     `https://api.twitch.tv/helix/users?login=${cleanSearch}`
    //   );
    //   console.log(result);

    //   if (result.data.data.length === 0) {
    //     setResult(false);
    //   } else {
    //     setStreamerInfo(result.data.data);
    //   }
    // };
    // fetchData();
  });

  return result ? (
    <>
      <Sidebar />
      <div>
        <div className="containerDecaleResultats">
          <h4>Résultats de recherche : </h4>

          {streamerInfo.map((stream, index) => (
            <div key={index} className="carteResultats">
              <img
                src={stream.profile_image_url}
                alt="resultat profile"
                className="imgCarte"
              />

              <div className="cardBodyResults">
                <h5 className="titreCartesStream">{stream.display_name}</h5>
                <div className="txtResult">{stream.description}</div>

                <Link
                  className="lien"
                  to={{
                    pathname: `/stream/live/${stream.login}`,
                  }}
                >
                  <div className="btnCarte btnResult">
                    Regarder {stream.display_name}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  ) : (
    <>
    <Sidebar />
    <Erreur />
    </>
  );
}

export default Resultats;
