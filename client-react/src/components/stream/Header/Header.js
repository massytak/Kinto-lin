import React, { useState, useEffect } from "react";
import search from "./Search.svg";
import menuIco from "./MenuIco.svg";
import croix from "./Croix.svg";
import signupLogo from "../../../Styling/signup.svg";
import loginLogo from "../../../Styling/logoLogin.png"
import logoAcount from "../../../Styling/logo-account.png"
import logoutlog from "../../../Styling/logo-logout.png";
import { Link } from "react-router-dom";
import { logout } from "../../auth/auth-service";
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
    }, 2);
  };
  return (
    <div>
      <nav className="headerTop">
        {(menu || !smallScreen) && (
          <ul className="listeMenu">
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/home" onClick={update}>
                <h3>Kinto-Un</h3>
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/games" onClick={update}>
                Games
              </Link>
            </li>
            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/stream" onClick={update}>
                Top Games
              </Link>
            </li>

            <li onClick={hideMenu} className="liensNav">
              <Link className="lien" to="/stream/top-streams" onClick={update}>
                Top Streams
              </Link>
            </li>
            {pathname && (
              <li className="liensNav">
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
                    <button type="submit">
                      <img
                        src={search}
                        alt="icone loupe"
                        className="logoLoupe"
                      />
                    </button>
                  </Link>
                </form>
              </li>
            )}
            {props.userInSession && (
              <>
              {!pathname && (<li className="liensNav"></li>)}
                <li onClick={hideMenu} className="liensNav">
                  {props.userInSession.username} is connected
                </li>
                {props.userInSession.admin && (
                  <li onClick={hideMenu} className="liensNav">
                    <Link className="lien" to="/addgame" onClick={update}>
                      Add games
                    </Link>
                  </li>
                )}
                 <li className="liensNav">
                  <Link
                    className="lien"
                    to={{
                      pathname: `/home`,
                    }}
                    onClick={update}
                  >
                    <button
                      className="buttonLogout"
                      onClick={(e) => {
                        logout().then(() => props.updateUser(false));
                      }}
                    >
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
                        logout().then(() => props.updateUser(false));
                      }}
                    >
                      <img
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
                  <Link className="lien" to="/login" onClick={update}>
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
