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
  // handleDeleteUser = () => {
  //   logout()
  //     .then(() => {
  //       props.updateUser(false);
  //       deleteProfile(this.state.id)
  //         .then(() => {
  //           window.location.reload();
  //           this.props.history.replace(`/home`);
  //         })

  //         .catch((err) => console.log(err));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  render(props) {
    return (
      (!this.state.userInfostate && <h1>Loading ...</h1>) || (
        <div>
          <h3 className="titre">Voir le profile</h3>
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
                <button className="buttoninfo">edit my profile</button>
              </Link>
              <Link to={{ pathname: `/delete/${this.state.id}` }}>
                <button
                  className="buttoninfo"
                  onClick={(props)=>{logout()
                    .then(() => {
                      props.updateUser(false);
                      deleteProfile(this.state.id)
                        .then(() => {
                          
                          this.props.history.replace(`/home`);
                          window.location.reload();
                        })

                        .catch((err) => console.log(err));
                    })
                    .catch((err) => {
                      console.log(err);
                    })}}
                >
                  Delete my profil
                </button>
              </Link>
            </div>
          </div>
        </div>
      )
    );
  }
}

export default ViewProfile;
