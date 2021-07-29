//////////axios dans game et rappel des cockkies
import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/games",
  withCredentials: true, //a ne pas oublier pour les cockies qure vous etes connecter
});
export default service;
//////////service game de api////////////
const serviceapi = axios.create({
  baseURL: "https://www.freetogame.com/api/games?tag=3d.mmorpg.fantasy.pvp",
  headers: {
    "X-RapidAPI-Key": "3eba6c643amsh07a0bcdfc1e78acp1517d6jsna41d0463d8b6",
    "X-RapidAPI-Host": "free-to-play-games-database.p.rapidapi.com",
  },
});
export { serviceapi };

/////////////////detail jeu//////////////
function detailofGame(id) {
  return service.get(`/${id}`).then((response) => response.data);
}
export { detailofGame };

//////////////liste des jeu////////////
function listofGames() {
  return service.get("/").then((allGames) => allGames.data);
}
export { listofGames };

///////////////addgame///////////
function addGametoData() {
  return serviceapi.get("").then((response) => response.data);
}
export { addGametoData };
