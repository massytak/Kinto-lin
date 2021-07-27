//////////axios dans game et rappel des cockkies
import axios from "axios";

const service = axios.create({
  baseURL: "http://localhost:5000/games",
  withCredentials: true, //a ne pas oublier pour les cockies qure vous etes connecter
});
export default service;

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
