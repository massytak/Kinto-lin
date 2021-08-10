import React, { Component } from "react";
import { detailofGame } from "./game-service";
import { editGame } from "./game-service";
import Select from "react-select";

const options = [
  { value: "MMORPG", label: "MMORPG" },
  { value: "Card games", label: "Card games" },
  { value: "MMO", label: "MMO" },
  { value: "Fighting", label: "Fighting" },
  { value: "MOBA ", label: "MOBA " },
  { value: "Racing ", label: "Racing " },
  { value: "Social", label: "Social" },
  { value: "Shooter", label: "Shooter" },
  { value: "Sports ", label: "Sports " },
  { value: "Strategy ", label: "Strategy " },
];

class EditGame extends Component {
  state = {
    id: this.props.match.params.id,
    game: false,
    title: "",
    trailer: "",
    thumbnail: "",
    description: "",
    game_url: "",
    developer: "",
    publisher: "",
    platform: "",
    dateReelease: "",
    genre: "",
    screenshots1: "",
    screenshots2: "",
    screenshots3: "",
    screenshots4: "",
    os: "",
    processor: "",
    storage: "",
    memory: "",
    graphics: "",
  };
  componentDidMount() {
    detailofGame(this.state.id)
      .then((game) => {
        if (!game.minimum_system_requirements.os) {
          this.setState({
            os: "non renseigné",
          });
        } else {
          this.setState({
            os: game.minimum_system_requirements.os,
          });
        }
        if (!game.minimum_system_requirements.storage) {
          this.setState({
            storage: "non renseigné",
          });
        } else {
          this.setState({
            storage: game.minimum_system_requirements.storage,
          });
        }
        if (!game.minimum_system_requirements.processor) {
          this.setState({
            processor: "non renseigné",
          });
        } else {
          this.setState({
            processor: game.minimum_system_requirements.processor,
          });
        }
        if (!game.minimum_system_requirements.memory) {
          this.setState({
            memory: "non renseigné",
          });
        } else {
          this.setState({
            memory: game.minimum_system_requirements.memory,
          });
        }
        if (!game.minimum_system_requirements.graphics) {
          this.setState({
            graphics: "non renseigné",
          });
        } else {
          this.setState({
            graphics: game.minimum_system_requirements.graphics,
          });
        }
        if (!game.screenshots[3]?.image) {
          this.setState({
            screenshots4: "",
          });
        } else {
          this.setState({
            screenshots4: game.screenshots[3].image,
          });
        }
        this.setState({
          game: game,
          title: game.title,
          trailer: game.trailer,
          thumbnail: game.thumbnail,
          description: game.description,
          game_url: game.game_url,
          developer: game.developer,
          publisher: game.publisher,
          platform: game.platform,
          release_date: game.release_date,
          genre: game.genre,
          screenshots1: game.screenshots[0]?.image,
          screenshots2: game.screenshots[1]?.image,
          screenshots3: game.screenshots[2]?.image,
        });
      })
      .catch((err) => console.log("err lors du chargement", err));
  }
  handleFormSubmit = (event) => {
    event.preventDefault();
    const title = this.state.title;
    const trailer = this.state.trailer;
    const thumbnail = this.state.thumbnail;
    const description = this.state.description;
    const game_url = this.state.game_url;
    const developer = this.state.developer;
    const publisher = this.state.publisher;
    const platform = this.state.platform;
    const release_date = this.state.release_date;
    const genre = this.state.genre;
    const screenshots1 = this.state.screenshots1;
    const screenshots2 = this.state.screenshots2;
    const screenshots3 = this.state.screenshots3;
    const screenshots4 = this.state.screenshots4;
    const os = this.state.os;
    const processor = this.state.processor;
    const storage = this.state.storage;
    const memory = this.state.memory;
    const graphics = this.state.graphics;

    editGame(
      this.state.id,
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
    )
      .then((response) => {
        // this.props.updateUser(response);
        this.props.history.push("/listgames");
      })
      //     .catch((error) => console.log(error));
      .catch((error) => {
        this.setState({ err: error.response.data.message });
        setTimeout(() => {
          this.setState({
            err: null,
          });
        }, 3000);
      });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    // if(type==='genre'){
    //   value=event.target.genre
    // }
    this.setState({ [name]: value });
  };
  handleSelectChange = (selectedOption) => {
    this.setState({ genre: selectedOption.label });
  };
  render() {
    return (
      <div>
        <h2>Edit game</h2>
        <form onSubmit={this.handleFormSubmit}>
          <div>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={(e) => this.handleChange(e)}
            />
            <label>Url video:</label>
            <input
              type="url"
              name="trailer"
              value={this.state.trailer}
              onChange={(e) => this.handleChange(e)}
            />
            <label>Url image:</label>
            <input
              type="url"
              name="thumbnail"
              value={this.state.thumbnail}
              onChange={(e) => this.handleChange(e)}
            />
            <br />
            <label>Description:</label>
            <textarea
              type="text"
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
              rows="8"
              cols="70"
            />
            <br />
            <label>Url jeux:</label>
            <input
              type="url"
              name="game_url"
              value={this.state.game_url}
              onChange={(e) => this.handleChange(e)}
            />
          </div>

          <div>
            <h3>Information additionnelles</h3>
            <label>developer:</label>
            <input
              type="text"
              name="developer"
              value={this.state.developer}
              onChange={(e) => this.handleChange(e)}
            />
            <label>publisher:</label>
            <input
              type="text"
              name="publisher"
              value={this.state.publisher}
              onChange={(e) => this.handleChange(e)}
            />
            <label>platform:</label>
            <input
              type="text"
              name="platform"
              value={this.state.platform}
              onChange={(e) => this.handleChange(e)}
            />
            <label>date de réalisation:</label>
            <input
              type="date"
              name="release_date"
              value={this.state.release_date}
              onChange={(e) => this.handleChange(e)}
            />
            <br />
            <label>genre:</label>
            <Select
              placeholder={this.state.genre}
              name="genre"
              value={this.state.genre}
              onChange={(e) => this.handleSelectChange(e)}
              options={options}
            />
          </div>
          <div>
            <h3>screenshots</h3>

            <label>screenshots1:</label>
            <input
              type="url"
              name="screenshots1"
              value={this.state?.screenshots1}
              onChange={(e) => this.handleChange(e)}
            />
            <label>screenshots2:</label>
            <input
              type="url"
              name="screenshots2"
              value={this.state?.screenshots2}
              onChange={(e) => this.handleChange(e)}
            />

            {this.state.screenshots3 && (
              <>
                <label>screenshots3:</label>
                <input
                  type="url"
                  name="screenshots3"
                  value={this.state.screenshots3}
                  onChange={(e) => this.handleChange(e)}
                />
              </>
            )}
            {this.state.screenshots4 && (
              <>
                <label>screenshots4:</label>
                <input
                  type="url"
                  name="screenshots4"
                  value={this.state?.screenshots4}
                  onChange={(e) => this.handleChange(e)}
                />
              </>
            )}
          </div>
          <div>
            <h3>Configuration minimale requise</h3>
            <label>os:</label>
            <input
              type="text"
              name="os"
              value={this.state.os}
              onChange={(e) => this.handleChange(e)}
            />
            <label>processor:</label>
            <input
              type="text"
              name="processor"
              value={this.state.processor}
              onChange={(e) => this.handleChange(e)}
            />
            <label>storage:</label>
            <input
              type="text"
              name="storage"
              value={this.state.storage}
              onChange={(e) => this.handleChange(e)}
            />
            <label>memory:</label>
            <input
              type="text"
              name="memory"
              value={this.state.memory}
              onChange={(e) => this.handleChange(e)}
            />
            <label>graphics:</label>
            <input
              type="text"
              name="graphics"
              value={this.state.graphics}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <br />
          <button>Edit</button>
        </form>
      </div>
    );
  }
}

export default EditGame;
