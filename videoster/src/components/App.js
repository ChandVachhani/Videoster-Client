import React from "react";
import { Router, Route } from "react-router-dom";

import history from "../history";

import Login from "./Authentication/Login";

class App extends React.Component {
  render() {
    return (
      <Router history={history}>
        <Route path="/" component={Login} />
      </Router>
    )
  }
}

export default App;