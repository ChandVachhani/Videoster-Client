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
          className="submit"
          style={{ width: "200px" }}
          onClick={async () => {
            await this.props.selectCategory(category);
            history.push("/Dashboard");
          }}
        >
          {category.toUpperCase()}
        </button>
      );
    });
  };

  render() {
    return (
      <div className="landingplace--body">
        <center>
          <div className="category--collection">{this.renderCategories()}</div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories };
};

export default connect(mapStateToProps, { getCategories, selectCategory })(
  LandingPlace
);
