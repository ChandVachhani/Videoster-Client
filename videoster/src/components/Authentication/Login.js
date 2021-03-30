import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import LoginImage from "./assets/images/Login2.svg";

import { takeMeIn, verifyLogin, forgotPassword } from "../../actions/index";

import history from "../../history";

class Login extends React.Component {
  async componentDidMount() {}

  componentDidUpdate() {
    if (this.props.user.userId) {
      history.push("/LandingPlace");
    }
  }

  render() {
    return (
      <div className="login-body">
        <center>
          <Row className="login--main">
            <Col xl={6} lg={12} md={12} sm={12} className="special-login">
              <Formik
                initialValues={{
                  userName: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.userName) {
                    errors.userName = "UserName can not be empty!";
                  }
                  if (!values.password) {
                    errors.password = "Password can not be empty!";
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  document.querySelector(".login-spinner").style.display =
                    "inline-block";
                  await this.props.takeMeIn(values);
                  if (document.querySelector(".login-spinner"))
                    document.querySelector(".login-spinner").style.display =
                      "none";
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <div className="card--main text-center">
                    <div className="card--header">
                      <h1>LOGIN</h1>
                    </div>
                    {/* <div className="card--subheading">
                      <p>Please Enter your Login and Password</p>
                    </div> */}
                    <div className="card--body">
                      <Form>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="userName"
                            name="userName"
                            placeholder="Username / email"
                            autoComplete="off"
                            title={
                              errors.userName && touched.userName
                                ? errors.userName
                                : ""
                            }
                            style={{
                              borderColor: `${
                                errors.userName && touched.userName ? "red" : ""
                              }`,
                            }}
                          />
                          {/* <ErrorMessage name="userName" component="div" /> */}
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="password"
                            placeholder="Password"
                            autoComplete="off"
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
                          {/* <ErrorMessage name="password" component="div" /> */}
                        </div>
                        <div className="card--forgot">
                          <a
                            href="#"
                            onClick={() => {
                              let userName = window.prompt(
                                "Enter your userName or email!"
                              );
                              console.log(userName);
                              if (userName)
                                this.props.forgotPassword({ userName });
                            }}
                          >
                            Forgot my password
                          </a>
                        </div>
                        <button type="submit" className="submit">
                          <div
                            class="spinner-grow text-success login-spinner"
                            style={{
                              width: "1rem",
                              height: "1rem",
                              display: "none",
                            }}
                            role="status"
                          ></div>
                          &nbsp; LOGIN
                        </button>
                      </Form>
                    </div>
                    <div className="card--footer">
                      <p style={{ display: "inline-block" }}>
                        First time here? &nbsp;
                      </p>
                      <Link to="/Register">Create an Account</Link>
                    </div>
                  </div>
                )}
              </Formik>
            </Col>
            <Col xl={6} lg={12} md={12} sm={12} className="login--image--main">
              <div className="login-image">
                <img src={LoginImage} alt="Login" />
              </div>
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
  forgotPassword,
})(Login);
