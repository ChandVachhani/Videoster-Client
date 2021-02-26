import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import history from "../history";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import DashBoard from "./Dashboard/Dashboard";
import LandingPlace from "./Authentication/LandingPlace";
import SearchChannels from "./Dashboard/SearchChannels";

import { verifyLogin, getChannels, getCategories } from "../actions/index";
import { connect } from "react-redux";

class App extends React.Component {
  async componentDidMount() {
    console.log("app.componentDidMount");
    await this.props.verifyLogin();
    await this.props.getCategories();
    await this.props.getChannels();
  }

  async componentDidUpdate(preProps) {
    console.log("app.componentDidUpdate");
    if (preProps.selectedCategory != this.props.selectedCategory) {
      await this.props.getChannels();
    }
  }

  render() {
    return (
      <Router history={history}>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route
          path="/LandingPlace"
          exact
          render={() => {
            return this.props.user.userId ? (
              <LandingPlace />
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
        <Route
          path="/Register"
          exact
          render={() => {
            return this.props.user.userId ? <Register /> : <Redirect to="/" />;
          }}
        ></Route>
        <Route
          path="/SearchChannels"
          exact
          render={() => {
            return this.props.user.userId ? (
              <SearchChannels />
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
        <Route
          path="/Dashboard"
          exact
          render={() => {
            return this.props.user.userId ? (
              this.props.selectedCategory ? (
                <DashBoard />
              ) : (
                <Redirect to="/LandingPlace" />
              )
            ) : (
              <Redirect to="/" />
            );
          }}
        ></Route>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, selectedCategory: state.selectedCategory };
};

export default connect(mapStateToProps, {
  verifyLogin,
  getChannels,
  getCategories,
})(App);
