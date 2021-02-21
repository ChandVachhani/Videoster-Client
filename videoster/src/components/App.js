import React from "react";
import { Router, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.css";

import history from "../history";

import Login from "./Authentication/Login";
import Register from "./Authentication/Register";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" exact component={Login} />
        <Route path="/Register" exact component={Register} />
      </Router>
    )
  }
}

export default App;