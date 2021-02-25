import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

import { checkLogIn, verifyLogin, selectCategory } from "../../actions/index";

import history from "../../history";

class LandingPlace extends React.Component {
  renderCategories = () => {
    return Object.keys(this.props.categories).map((category) => {
      return (
        <button
          className="btn btn-primary"
          onClick={async () => {
            await this.props.selectCategory(category);
            history.push("/Dashboard");
          }}
        >
          {category}
        </button>
      );
    });
  };

  render() {
    return <div>{this.renderCategories()}</div>;
  }
}

const mapStateToProps = (state) => {
  return { user: state.user, categories: state.categories };
};

export default connect(mapStateToProps, {
  checkLogIn,
  verifyLogin,
  selectCategory,
})(LandingPlace);
