import React, { Component } from "react";
import { Link } from "react-router-dom";
import { loggedin } from "./auth-service";
import "../../Styling/profilUser.css";
class ViewProfile extends Component {
  state = {
    id: this.props.match.params.id,
    username: "",
    email: "",
    image: "",
    userInfostate: false,
  };

  componentDidMount() {
    loggedin().then((userInfo) => {
      this.setState({
        userInfostate: userInfo,
        username: userInfo.username,
        email: userInfo.email,
        image: userInfo.image,
      });
    });
  }

  render() {
    return (
      (!this.state.userInfostate && <h1>Loading ...</h1>) || (
        <div  className ="profi">
          <h3>Voir le profile</h3>
          <img className="avatar" src={this.state.image} alt="photot de profile"/>
          <p>Username : {this.state.username}</p>
          <p>Email : {this.state.email}</p>

          <Link to={{ pathname: `/editprofil/${this.state.id}` }}>
            <button>edit my profile</button>
          </Link>
          <Link>
            <button onClick="{}">Delete my profil</button>
          </Link>
        </div>
      )
    );
  }
}

export default ViewProfile;
