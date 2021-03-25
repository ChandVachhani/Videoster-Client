import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { toggleSidebar, logOut, getTokenData } from "../../actions/index";
import { connect } from "react-redux";
import welcomeImg from "./assets/images/welcome.png";

import history from "../../history";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Navbar
          variant="dark"
          bg="dark"
          style={{ height: "60px" }}
          className="fixed-top"
          expand="sm"
        >
          <Navbar.Text>
            <Navbar.Brand>
              <span className="makeGray">
                <ion-icon
                  name="menu-outline"
                  size="large"
                  style={{ transform: "translateY(7px)" }}
                  onClick={() => {
                    this.props.toggleSidebar(!this.props.hideSidebar);
                  }}
                ></ion-icon>
              </span>
            </Navbar.Brand>
            <Navbar.Brand>
              <h4
                className="appName"
                style={{ display: "inline-block" }}
                onClick={() => {
                  history.push("/Dashboard");
                }}
              >
                {/* &nbsp;Hey {this.props.user.userName}! */}
                Videoster
              </h4>
            </Navbar.Brand>
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand>
              <small>
                <button
                  className="headerbtn"
                  onClick={() => {
                    history.push("/Token");
                  }}
                >
                  Token
                </button>
              </small>
              <small>
                <button
                  className="headerbtn"
                  onClick={async () => {
                    const token = window.prompt("Enter Token : ");
                    if (token) {
                      await this.props.getTokenData(token);
                      history.push("/Import");
                    }
                  }}
                >
                  Import
                </button>
              </small>
              <small>
                <button
                  className="headerbtn"
                  onClick={async () => {
                    await this.props.logOut();
                  }}
                >
                  SignOut
                </button>
              </small>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { hideSidebar: state.hideSidebar, user: state.user };
};

export default connect(mapStateToProps, {
  toggleSidebar,
  logOut,
  getTokenData,
})(Header);
