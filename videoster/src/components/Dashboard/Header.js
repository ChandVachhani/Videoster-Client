import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';

import { toggleSidebar } from "../../actions/index";
import { connect } from "react-redux";

import history from "../../history";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Navbar variant="dark" bg="dark" expand="lg" style={{ height: "60px" }} className="fixed-top">
          <Navbar.Collapse>
            <Navbar.Brand>
              <span className="makeGray">
                <ion-icon
                  name="menu-outline"
                  size="large"
                ></ion-icon>
              </span>
            </Navbar.Brand>
            <Navbar.Brand >
              <h4 className="appName makeGray" onClick={() => {
                history.push("/Dashboard")
              }}>
                Videoster
              </h4>
            </Navbar.Brand >
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Brand>
              <Button className="headerbtn" onClick={() => {
                history.push("/");
              }}>
                Token
              </Button>
              <Button className="headerbtn" onClick={() => {
                history.push("/");
              }}>
                Import
              </Button>
              <Button className="headerbtn" onClick={() => {
                history.push("/");
              }}>
                SignOut
              </Button>
            </Navbar.Brand>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default connect(null, { toggleSidebar })(Header);