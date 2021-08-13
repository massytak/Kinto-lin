import axios from "axios";

import React, { Component } from "react";
import ReactPlayer from "react-player";
import Sidebar from "./Sidebar/Sidebar";
import startingSoon from "../../Styling/Screen_1024x1024@2x.gif";

class Online extends Component {
  state = {
    online: false,
    streamUrl: "",
  };
  componentDidMount() {
    axios
      .get(
        "https://c6248af16db9.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.973696151045.channel.fdVgYWp5B24I.m3u8"
      )
      .then(() =>
        this.setState({
          online: true,
          streamUrl:
            "https://c6248af16db9.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.973696151045.channel.fdVgYWp5B24I.m3u8",
        })
      )
      .catch((err) => this.setState({ online: false }));
  }
  render() {
    const divStyle = {
      width: "70%",
    };
    return (
      <div>
        <Sidebar />
        {this.state.streamUrl && (
          <header className="containerDecale">
            <div style={divStyle}>
              <ReactPlayer
                url={this.state.streamUrl}
                width="100%"
                height="100%"
                playing
              />
            </div>
          </header>
        )}
        {!this.state.streamUrl && (
          <div className="containerDecale">
            <div style={divStyle}>
              <img src={startingSoon} alt="satrtsoon" style={{height:"754" ,width:"100%" }} />
            </div>

            <div className="contInfo">
              <div className="titreStream">Le Streamer est offline ! </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Online;
