//////////axios dans game et rappel des cockkies
import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.MONGODB_URI/stream}`,
  withCredentials: true, //a ne pas oublier pour les cockies qure vous etes connecter
});
export default service;
////////////get top game//////////
function getTopGame() {
  return service.get(`/games`).then((response) => response.data);
}
export { getTopGame };

///////////////get top stream////////

function getTopstream() {
  return service.get(`/sidebar`).then((response) => response.data);
}
export { getTopstream };


/////////////////////get streamer info /////////

function getStreamer(slug) {
  return service.get(`/streamer/${slug}`).then((response) => response.data);
}
export { getStreamer };

/////////////////////get game info//////////////

function getGame(id) {
  return service.get(`/game/${id}`).then((response) => response.data);
}
export { getGame };
 ///////////////get live////////////
 function getLive(slug) {
  return service.get(`/live/${slug}`).then((response) => response.data);
}
export { getLive };

/////////////////get search resultat/////////////////
function searchTwitch(cleanSearch) {
  return service.get(`/resultats/${cleanSearch}`).then((response) => response.data);
}
export { searchTwitch };
/////////////////get search games/////////////////
function gamesTwitch(slug) {
  return service.get(`/games/${slug}`).then((response) => response.data);
}
export { gamesTwitch };