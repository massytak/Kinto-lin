/** @format */

// components/Navbar.js

import React from "react";
import { Link } from "react-router-dom";
import { logout } from "./auth/auth-service";

const Navbar = (props) => {
  return (
    <nav className="nav-style">
      {props.userInSession ? (
        <ul>
          <li>Welcome, {props.userInSession.username}</li>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <button
            onClick={(e) => {
              logout().then(() => props.updateUser(false));
            }}
          >
            Logout
          </button>
        </ul>
      ) : (
        <ul>
          <li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;
