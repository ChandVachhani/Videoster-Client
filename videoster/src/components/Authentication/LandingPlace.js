import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import welcomeImg from "./assets/images/welcome.png";

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
          {/* <div>
            
          </div> */}
          <div className="category--collection">
            <img
              style={{
                width: "45px",
                display: "inline-block",
              }}
              src={welcomeImg}
              alt="Welcome img!"
            ></img>
            <h4
              className="appName"
              style={{ display: "inline-block", color: "white" }}
            >
              &nbsp;&nbsp;Welcome{" "}
              <span style={{ color: "#2ecc71" }}>
                {this.props.user.userName.toUpperCase()}
              </span>
              !, Where do you want to Land?
            </h4>
            <br />
            <br />
            {this.renderCategories()}
          </div>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { categories: state.categories, user: state.user };
};

export default connect(mapStateToProps, { getCategories, selectCategory })(
  LandingPlace
);
