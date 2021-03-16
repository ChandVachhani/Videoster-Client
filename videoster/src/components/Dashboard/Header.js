import React from "react";
import { Button, Container, Nav, Navbar } from "react-bootstrap";

import { toggleSidebar, logOut, getTokenData } from "../../actions/index";
import { connect } from "react-redux";
import welcomeImg from "./assets/images/welcome.png";

import history from "../../history";

class Header extends React.Component {
  render() {
    return (
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark p-0 fixed-top">
        <div class="container">
          <ion-icon
            name="menu-outline"
            class="pl-3"
            size="large"
            onClick={() => {
              this.props.toggleSidebar(!this.props.hideSidebar);
            }}
          ></ion-icon>
          <a href="index.html" class="navbar-brand pl-3">
            Videoster
          </a>
          <button
            class="navbar-toggler"
            data-toggle="collapse"
            data-target="#navbarCollapse"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav ml-auto pr-4">
              <li class="nav-item">
                <span class="nav-link" onClick={() => history.push("/Token")}>
                  Token
                </span>
              </li>
              <li class="nav-item">
                <span class="nav-link" onClick={() => history.push("/Import")}>
                  Import
                </span>
              </li>
              <li class="nav-item">
                <span
                  class="nav-link"
                  onClick={async () => {
                    await this.props.logOut();
                  }}
                >
                  Logout
                </span>
              </li>
            </ul>
          </div>
        </div>
      </nav>
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
