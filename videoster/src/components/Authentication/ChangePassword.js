import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import LoginImage from "./assets/images/Login2.svg";

import { takeMeIn, verifyLogin, changePassword } from "../../actions/index";

import history from "../../history";

class ChangePassword extends React.Component {
  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return (
      <div className="login-body">
        <center>
          <Row className="login--main">
            <Col xl={12} lg={12} md={12} sm={12} className="special-login">
              <Formik
                initialValues={{
                  password: "",
                  confirmPassword: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.password) {
                    errors.password = "password can not be empty!";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword =
                      "confirm Password can not be empty!";
                  } else if (values.password != values.confirmPassword) {
                    errors.confirmPassword = "Password dosen't match";
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  document.querySelector(".changePass--spinner").style.display =
                    "inline-block";
                  delete values.confirmPassword;
                  console.log(this);
                  values.token = this.props.token;
                  await this.props.changePassword(values);
                  if (document.querySelector(".changePass--spinner"))
                    document.querySelector(
                      ".changePass--spinner"
                    ).style.display = "none";
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <div className="card--main text-center">
                    <div className="card--body">
                      <Form>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            title={
                              errors.password && touched.password
                                ? errors.password
                                : ""
                            }
                            style={{
                              borderColor: `${
                                errors.password && touched.password ? "red" : ""
                              }`,
                            }}
                          />
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            title={
                              errors.confirmPassword && touched.confirmPassword
                                ? errors.confirmPassword
                                : ""
                            }
                            style={{
                              borderColor: `${
                                errors.confirmPassword &&
                                touched.confirmPassword
                                  ? "red"
                                  : ""
                              }`,
                            }}
                          />
                        </div>
                        <button
                          type="submit"
                          className="submit"
                          style={{ width: "200px" }}
                        >
                          <div
                            class="spinner-grow text-success changePass--spinner"
                            style={{
                              width: "1rem",
                              height: "1rem",
                              display: "none",
                            }}
                            role="status"
                          ></div>
                          &nbsp; CHANGE
                        </button>
                      </Form>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
          </Row>
        </center>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.user };
};

export default connect(mapStateToProps, {
  takeMeIn,
  verifyLogin,
  changePassword,
})(ChangePassword);
