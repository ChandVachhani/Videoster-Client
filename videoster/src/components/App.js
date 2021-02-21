import React from "react";
import { Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import history from "../history";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";
import DashBoard from "./Dashboard/Dashboard";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact>
          <Login />
        </Route>
        <Route path="/Register" exact >
          <Register />
        </Route>
        <Route path="/Dashboard" exact >
          <DashBoard />
        </Route>
      </Router>
    )
  }
}

export default App;