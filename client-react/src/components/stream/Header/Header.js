import React, { useState, useEffect } from "react";
import search from "./Search.svg";
import menuIco from "./MenuIco.svg";
import croix from "./Croix.svg";
import signupLogo from "../../../Styling/signup.svg";
import loginLogo from "../../../Styling/logoLogin.png";
import logoAcount from "../../../Styling/logo-account.png";
import logoutlog from "../../../Styling/logo-logout.png";
import { Link } from "react-router-dom";
import { logout } from "../../auth/auth-service";
import { BrowserRouter as Router } from "react-router-dom";
const Header = (props) => {
  const [menu, showMenu] = useState(false);
  const [smallScreen, setSmallScreen] = useState(false);
  const [searchInput, setSearch] = useState("");
  const [pathname, setpath] = useState(false);
  useEffect(() => {
    // document.location.reload()
    let path = window.location.pathname;

    if (path.startsWith("/stream")) {
      setpath(true);
    } else {
      setpath(false);
    }

    const mediaQuery = window.matchMedia("(max-width: 900px)");
    // addlistener = addeventlisterner pour les medias queries en JS
    mediaQuery.addListener(handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange);
    };
  }, []);

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setSmallScreen(true);
    } else {
      setSmallScreen(false);
    }
  };

  const toggleNavRes = () => {
    showMenu(!menu);
  };

  const hideMenu = () => {
    if (menu === true) {
      showMenu(!menu);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleKeyPress = (e) => {
    setSearch(e.target.value);
  };
  const update = () => {
    setTimeout(() => {
      window.location.reload();
    }, 200);
  };
  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
          <ul className="listeMenu">
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/home">
                <h3>Kinto-Un</h3>
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/games">
                Games
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/stream">
                Top Games
              </Link>
              {}
            </li>

            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/stream/top-streams">
                Top Streams
              </Link>
            </li>
            {pathname && (
              <li className="liensNav">
                <Router forceRefresh={true}>
                  <div className="div">
                    <form className="formSubmit" onSubmit={handleSubmit}>
                      <input
                        required
                        value={searchInput}
                        onChange={(e) => handleKeyPress(e)}
                        type="text"
                        className="inputRecherche"
                      />

                      <Link
                        className="lien"
                        to={{
                          pathname: `/stream/resultats/${searchInput}`,
                        }}
                      >
                        <button onClick={update} type="submit">
                          <img
                            src={search}
                            alt="icone loupe"
                            className="logoLoupe"
                          />
                        </button>
                      </Link>
                    </form>
                  </div>
                </Router>
              </li>
            )}
            {props.userInSession && (
              <>
                {!pathname && <li className="liensNav"></li>}
                <li onClick={hideMenu} className="liensNav">
                  {props.userInSession.username} is connected
                </li>
                {props.userInSession.admin && (
                  <li onClick={hideMenu} className="liensNav">
                    <Link className="lien" to="/addgame">
                      Add games
                    </Link>
                  </li>
                )}
                <li className="liensNav">
                  <Link
                    className="lien"
                    to={{
                      pathname: `/viewprofil/${props.userInSession._id}`,
                    }}
                    onClick={update}
                  >
                    <button className="buttonLogout" onClick={(e) => {}}>
                      <img
                        src={logoAcount}
                        alt="icone account"
                        className="logoaccount"
                      />
                    </button>
                  </Link>
                </li>
                <li className="liensNav">
                  <Link
                    className="lien"
                    to={{
                      pathname: `/home`,
                    }}
                  >
                    <button
                      className="buttonLogout"
                      onClick={(e) => {
                        logout().then(() => {
                          props.updateUser(false);
                          update();
                        });
                      }}
                    >
                      <img
                        on
                        src={logoutlog}
                        alt="icone logout"
                        className="logologout"
                      />
                    </button>
                  </Link>
                </li>
              </>
            )}
            {!props.userInSession && (
              <>
                <li className="liensNav"></li>
                <li className="liensNav">
                  <Link className="lien" to="/signup">
                    <button className="buttonLogout">
                      <img
                        src={signupLogo}
                        alt="icone logout"
                        className="logologout"
                      />
                    </button>
                  </Link>
                </li>
                <li className="liensNav">
                  <Link className="lien" to="/login">
                    <button className="buttonLogout">
                      <img
                        src={loginLogo}
                        alt="icone login"
                        className="logologout"
                      />
                    </button>
                  </Link>
                </li>
              </>
            )}
          </ul>
        )}
      </nav>

      <div className="menuResBtn">
        <img
          onClick={toggleNavRes}
          src={!menu ? menuIco : croix}
          alt="icone menu responsive"
          className="menuIco"
        />
      </div>
    </div>
  );
};

export default Header;
