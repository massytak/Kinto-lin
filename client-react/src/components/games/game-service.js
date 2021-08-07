//////////axios dans game et rappel des cockkies
import axios from "axios";

const service = axios.create({
  baseURL: `${process.env.REACT_APP_APIURL/games}`,
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
function addGametoData(titlesearch) {
  return service
    .post("/addgames", { titlesearch })
    .then((response) => response.data);
}
export { addGametoData };

//////////////////Delete game/////////////
function deleteGame(id) {
  return service.delete(`/${id}`).then((response) => console.log(response));
}
export { deleteGame };
//////////////////Edit game///////////////
function editGame(
  id,
  title,
  trailer,
  thumbnail,
  description,
  game_url,
  developer,
  publisher,
  platform,
  release_date,
  genre,
  screenshots1,
  screenshots2,
  screenshots3,
  screenshots4,
  os,
  processor,
  storage,
  memory,
  graphics
) {
  return service
    .put(`/${id}`, {
      title,
      trailer,
      thumbnail,
      description,
      game_url,
      developer,
      publisher,
      platform,
      release_date,
      genre,
      'screenshots.0.image':screenshots1,
      'screenshots.1.image':screenshots2,
      'screenshots.2.image':screenshots3,
      'screenshots.3.image':screenshots4,
      'minimum_system_requirements.os':os,
      'minimum_system_requirements.processor':processor,
      'minimum_system_requirements.storage':storage,
      'minimum_system_requirements.memory':memory,
      'minimum_system_requirements.graphics':graphics,
    })
    .then((response) => console.log(response));
}
export { editGame };
