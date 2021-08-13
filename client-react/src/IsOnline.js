import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import "../src/Styling/isOnline.css";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
const IsOnline = () => {
  const [online, setOnline] = useState(false);
  const [streamUrl, setstreamUrl] = useState("");
  useEffect(() => {
    // document.location.reload()

    axios
      .get(
        "https://c6248af16db9.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.973696151045.channel.fdVgYWp5B24I.m3u8"
      )
      .then(() => {
        setOnline(true);
        setstreamUrl(
          "https://c6248af16db9.eu-west-1.playback.live-video.net/api/video/v1/eu-west-1.973696151045.channel.fdVgYWp5B24I.m3u8"
        );
      })
      .catch((err) => {
        setOnline(false);
        setstreamUrl("");
      });
  }, []);
  
  return (
    <div className="messageLive">
      {online && (
        <div className="divstyleonline">
          <Link to="/stream/online">
            <p>Massytak is online</p>
            <ReactPlayer url={streamUrl} width="100%" height="100%" playing />
          </Link>
        </div>
      )}
      
    </div>
  );
};

export default IsOnline;
