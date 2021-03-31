import React from "react";
import { Router, Route, Redirect } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import history from "../history";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import VarifyEmail from "./Authentication/VarifyEmail";
import DashBoard from "./Dashboard/Dashboard";
import LandingPlace from "./Authentication/LandingPlace";
import ChangePassword from "./Authentication/ChangePassword";
import SearchChannels from "./Dashboard/SearchChannels";
import TokenPage from "./Dashboard/TokenPage";
import ImportData from "./Dashboard/ImportData";

import { NotificationContainer } from "react-notifications";

import {
  verifyLogin,
  getChannels,
  getCategories,
  toggleSidebar,
  getVideos,
  videoPagination,
  clearAllChannels,
  varifyEmail,
} from "../actions/index";
import { connect } from "react-redux";

class App extends React.Component {
  async componentDidMount() {
    console.log("app.componentDidMount");
    await this.props.verifyLogin();
    if (this.props.user.userId) {
      await this.props.getCategories();
      await this.props.videoPagination(0);
      await this.props.getChannels();
      await this.props.getVideos();
    }

    if (window.innerWidth < 992) {
      this.props.toggleSidebar(true);
    } else {
      this.props.toggleSidebar(false);
    }
    window.addEventListener("resize", () => {
      this.props.toggleSidebar(window.innerWidth <= 992);
    });
  }

  async componentDidUpdate(preProps) {
    console.log("app.componentDidUpdate");
    if (preProps.selectedCategory != this.props.selectedCategory) {
      await this.props.clearAllChannels();
      await this.props.videoPagination(0);
      await this.props.getChannels();
      await this.props.getVideos();

      [...document.querySelectorAll(".btn--category")].forEach((btn) => {
        btn.disabled = false;
      });
    }
  }

  render() {
    return (
      <div>
        <NotificationContainer />
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
          <Route path="/Register" exact>
            <Register />
          </Route>
          <Route path="/varifyEmail/:token" exact>
            <VarifyEmail />
          </Route>
          <Route path="/changePassword/:token" exact>
            <ChangePassword
              token={
                window.location.href.split("/")[
                  window.location.href.split("/").length - 1
                ]
              }
            />
          </Route>

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
          <Route
            path="/Token"
            exact
            render={() => {
              return this.props.user.userId ? (
                this.props.selectedCategory ? (
                  <TokenPage />
                ) : (
                  <Redirect to="/LandingPlace" />
                )
              ) : (
                <Redirect to="/" />
              );
            }}
          ></Route>
          <Route
            path="/Import"
            exact
            render={() => {
              return this.props.user.userId ? (
                this.props.selectedCategory ? (
                  <ImportData />
                ) : (
                  <Redirect to="/LandingPlace" />
                )
              ) : (
                <Redirect to="/" />
              );
            }}
          ></Route>
        </Router>
      </div>
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
  toggleSidebar,
  getVideos,
  videoPagination,
  clearAllChannels,
  varifyEmail,
})(App);
