import React, { Component } from "react";
import "../Styling/Footer.css";
import { Link } from "react-router-dom";
import logoSlack from "../Styling/logoSlack.png";
import logoLinkdin from "../Styling/logoLinkDin.png";
import logoGitHub from "../Styling/logoGitHUB.png";


// import {
//   Dropdown,
//   DropdownToggle,
//   DropdownMenu,
//   DropdownItem,
// } from "reactstrap";
// import "../javascripts/footer";
class Footer extends Component {
  state = {
    logoLink: "none",
    logosla: false,
    logoGIT: false,
    open: false
  };

  openLinkdin = () => {
    console.log(this.state.logoLink);
    if (this.state.logoLink === "show") {
      this.setState({
        logoLink: "none",
      });
    }
    if (this.state.logoLink === "none") {
      this.setState({
        logoLink: "show",
      });
    }
  };
  toggle = () => {
    this.setState({open: !this.state.open})
  }

  render() {
    const Mailto = ({ email, subject = "", body = "", children }) => {
      let params = subject || body ? "?" : "";
      if (subject) params += `subject=${encodeURIComponent(subject)}`;
      if (body)
        params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

      return (
        <a className="amailto" href={`mailto:${email}${params}`}>
          {children}
        </a>
      );
    };

    
    // const toggle = () => setDropdownOpen((prevState) => !prevState);
    return (
      <footer className="footer">
        <div className="logocontact">
          <p className="paraAboutus">About us :</p>

          <div className="dropdown">
            
          {this.state.open && <Modal toggle={this.toggle} />}
            <img
              onClick={this.toggle}
              src={logoLinkdin}
              alt="logolink"
              id="imgLinkdIn"
              className="linkdinlogo dropbtn"
            />
            <div
              id="myDropdownl"
              className="dropdown-content dropdwnlinkdin"
              style={{ display: `${this.state.logoLink}` }}
            >
              <Link
                to="https://www.linkedin.com/in/massinissa-messalti-32a693106/"
                target="_blank"
              >
                Massytak
              </Link>
              <Link
                to="https://www.linkedin.com/in/laurent-despr%C3%A9s-lolod/"
                target="_blank"
              >
                Lotiko
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <img
              src={logoSlack}
              alt="logoslack"
              id="imgSlack"
              className="slacklogo dropbtn"
            />
            <div
              id="myDropdowns"
              className="dropdown-content dropdwnslack"
              style={{ display: `none` }}
            >
              <Link
                to="https://app.slack.com/client/T02CQ4EN4/D0195KDG5MJ"
                target="_blank"
              >
                Massytak
              </Link>
              <Link
                to="https://join.slack.com/t/slack-ynt5469/shared_invite/zt-r000scly-u6wihXeXKkMkSXK2ubK3Zg"
                target="_blank"
              >
                Lotiko
              </Link>
            </div>
          </div>
          <div className="dropdown">
            <img
              src={logoGitHub}
              alt="logogit"
              id="imgGit"
              className="gitlogo dropbtn"
            />
            <div id="myDropdowng" className="dropdown-content dropdwngit">
              <Link
                className="gitme"
                to="https://github.com/massytak"
                target="_blank"
              >
                Massytak
              </Link>
              <Link
                className="gitme"
                to="https://github.com/lotiko"
                target="_blank"
              >
                Lotiko
              </Link>
            </div>
          </div>
        </div>
        <div className="divContactus">
          <ul className="linkfooter">
            <li className="linkfooter2">
              <Mailto
                className="linkfooter2"
                email="massi.messalti@gmail.com"
                subject="Hello  Welcome"
                body="Hello world!"
              >
                Contact-us
              </Mailto>
            </li>
          </ul>
        </div>
      </footer>
    );
  }
}

function Modal(props) {
  return (
    <div class="modal">
      <Link onClick={props.toggle}></Link>

      <Link>
      </Link>
    </div>
  )
}

export default Footer;
