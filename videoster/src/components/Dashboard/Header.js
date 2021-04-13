import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { toggleSidebar, logOut, getTokenData } from "../../actions/index";
import { connect } from "react-redux";
import welcomeImg from "./assets/images/welcome.png";

import { createNotification } from "../../utils/createNotification";

import history from "../../history";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Navbar
          variant="dark"
          bg="dark"
          // style={{ height: "60px" }}
          style={{ padding: "3px 20px" }}
          fixed="top"
          expand="sm"
        >
          <Navbar.Text>
            <Navbar.Brand>
              <span
                className="makeGray"
                onClick={() => {
                  this.props.toggleSidebar(!this.props.hideSidebar);
                }}
              >
                <ion-icon
                  name="menu-outline"
                  style={{ transform: "translateY(4px) scale(1.7)" }}
                ></ion-icon>
              </span>
            </Navbar.Brand>
            <Navbar.Brand
              className="appName"
              style={{ display: "inline-block" }}
              onClick={() => {
                history.push("/Dashboard");
              }}
            >
              {/* &nbsp;Hey {this.props.user.userName}! */}
              Videoster
            </Navbar.Brand>
          </Navbar.Text>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand>
              <span
                title={`Rename Category : Shift + Click

Delete Category : Ctrl + Click

Delete Channel : Ctrl + Click`}
                style={{ cursor: "pointer" }}
              >
                <ion-icon
                  name="information-circle-outline"
                  style={{
                    transform: "translateY(4px) scale(1.7)",
                    marginRight: "15px",
                  }}
                ></ion-icon>
              </span>
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
