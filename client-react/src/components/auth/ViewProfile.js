/** @format */

import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../../Styling/profilUser.css";
import { userInfo } from "./auth-service";
import { deleteProfile } from "./auth-service";
import { logout } from "./auth-service";
class ViewProfile extends Component {
  state = {
    id: this.props.match.params.id,
    username: "",
    email: "",
    image: "",
    userInfostate: false,
  };

  componentDidMount() {
    userInfo(this.state.id).then((userInfo) => {
      this.setState({
        userInfostate: userInfo,
        username: userInfo.username,
        email: userInfo.email,
        image: userInfo.image,
      });
    });
  }
  handleDeleteUser = () => {
    deleteProfile(this.state.id)
      .then(() => {
        this.props.history.push(`/`);
        this.update()
      })

      .catch((err) => console.log(err));
  };
  update = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };

  render(props) {
    return (
      (!this.state.userInfostate && <h1>Loading ...</h1>) || (
        <div>
          <h3 className="titre">My profile</h3>
          <div className="profil">
            <img
              className="avatar"
              src={this.state.image}
              alt="photot de profile"
            />
            <p className="para">Username : {this.state.username}</p>
            <p className="para">Email : {this.state.email}</p>
            <div className="buttonlocation">
              <Link to={{ pathname: `/editprofil/${this.state.id}` }}>
                <button className="buttoninfo">Edit my profile</button>
              </Link>

              <button
                className="buttoninfo"
                onClick={(e) => {
                  logout().then(() => {
                    // props.updateUser(false);
                    
                    this.handleDeleteUser();
                    // this.update();
                  });
                }}
              >
                Delete my profile
              </button>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ViewProfile;
