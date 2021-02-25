import React from "react";
import { Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import history from "../history";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import DashBoard from "./Dashboard/Dashboard";
import LandingPlace from "./Authentication/LandingPlace";
import SearchChannels from "./Dashboard/SearchChannels";

import { verifyLogin, getCategories } from "../actions/index";
import { connect } from "react-redux";

class App extends React.Component {
  async componentDidMount() {
    await this.props.verifyLogin();
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/LandingPlace" exact>
          <LandingPlace />
        </Route>
        <Route path="/Register" exact>
          <Register />
        </Route>
        <Route path="/SearchChannels" exact>
          <SearchChannels />
        </Route>
        <Route path="/Dashboard" exact>
          <DashBoard />
        </Route>
      </Router>
    );
  }
}

export default connect(null, { verifyLogin })(App);
