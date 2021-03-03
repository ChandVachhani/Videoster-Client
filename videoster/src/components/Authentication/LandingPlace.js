import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

import { getCategories, selectCategory } from "../../actions/index";

import history from "../../history";

class LandingPlace extends React.Component {
  async componentDidMount() {
    await this.props.getCategories();
  }

  renderCategories = () => {
    return this.props.categories.map((category) => {
      return (
        <button
          className="btn btn-primary"
          style={{ display: "block", marginTop: "10px" }}
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
    return (
      <center>
        <div>{this.renderCategories()}</div>
      </center>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { getCategories, selectCategory })(
  LandingPlace
);
