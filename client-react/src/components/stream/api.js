import axios from "axios";

const api = axios.create({
  headers: {
    "Client-ID": "504csxp967z1sthqz9fqrkkrxff76l",
    "Authorization": "Bearer k62x6otkmg4ttiujxi830ch44ror5p",
  },
});

/*
CLIENT_ID = h3wjlzyk1lhby2xcjboa0thfgixl4h
REDIRECT = https://localhost:3000/

LIEN AUTH = https://id.twitch.tv/oauth2/authorize?client_id={CLIENT_ID}&redirect_uri={REDIRECT}&response_type=token

LIEN REMPLI = https://id.twitch.tv/oauth2/authorize?client_id=h3wjlzyk1lhby2xcjboa0thfgixl4h&redirect_uri=https://localhost:3000/&response_type=token
*/

export default api;
