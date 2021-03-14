import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import welcomeImg from "./assets/images/welcome.png";

import {
  getCategories,
  selectCategory,
  clearAllChannels,
  clearSelectedCategory,
} from "../../actions/index";

import history from "../../history";

class LandingPlace extends React.Component {
  async componentDidMount() {
    await this.props.getCategories();
    await this.props.clearAllChannels();
    await this, props.clearSelectedCategory();
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
            <div style={{ display: "inline-block" }}>
              <h4
                className="appName"
                style={{ display: "inline-block", color: "white" }}
              >
                &nbsp;&nbsp;Welcome{" "}
                <span style={{ color: "#2ecc71", display: "inline-block" }}>
                  {this.props.user.userName.toUpperCase()}
                </span>
                !,{" "}
                <div style={{ display: "inline-block" }}>
                  {" "}
                  Where do you want to Land?
                </div>
              </h4>
            </div>
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

export default connect(mapStateToProps, {
  getCategories,
  selectCategory,
  clearAllChannels,
  clearSelectedCategory,
})(LandingPlace);
