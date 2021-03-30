import "./style.css";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import LoginImage from "./assets/images/Login2.svg";

import { connect } from "react-redux";
import { registerUser } from "../../actions/index";

class Register extends React.Component {
  componentDidMount() {
    // document.querySelector(".tool_tip").tooltip("show");
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
                  confirmPassword: "",
                  email: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.userName) {
                    errors.userName = "UserName can not be empty!";
                  }
                  if (!values.password) {
                    errors.password = "password can not be empty!";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword =
                      "confirm Password can not be empty!";
                  } else if (values.password != values.confirmPassword) {
                    errors.confirmPassword = "Password dosen't match";
                  }
                  if (!values.email) {
                    errors.email = "email can not be empty!";
                  } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                      values.email
                    )
                  ) {
                    errors.email = "Invalid email address";
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  document.querySelector(".register-spinner").style.display =
                    "inline-block";
                  delete values.confirmPassword;
                  await this.props.registerUser(values);
                  if (document.querySelector(".register-spinner"))
                    document.querySelector(".register-spinner").style.display =
                      "none";
                }}
              >
                {({ isSubmitting, errors, touched }) => (
                  <div className="card--main text-center">
                    <div className="card--header">
                      <h1>REGISTER</h1>
                    </div>
                    <div className="card--body">
                      <Form>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="userName"
                            name="userName"
                            placeholder="Username"
                            title={errors.userName}
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
                            type="email"
                            name="email"
                            placeholder="Email"
                            title={
                              errors.email && touched.email ? errors.email : ""
                            }
                            style={{
                              borderColor: `${
                                errors.email && touched.email ? "red" : ""
                              }`,
                            }}
                          />
                          {/* <ErrorMessage name="email" component="div" /> */}
                        </div>
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
                          {/* <ErrorMessage name="password" component="div" /> */}
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
                          {/* <ErrorMessage
                            name="confirmPassword"
                            component="div"
                          /> */}
                        </div>
                        <button
                          type="submit"
                          className="submit"
                          style={{ width: "200px" }}
                        >
                          <div
                            class="spinner-grow text-success register-spinner"
                            style={{
                              width: "1rem",
                              height: "1rem",
                              display: "none",
                            }}
                            role="status"
                          ></div>
                          &nbsp; REGISTER
                        </button>
                      </Form>
                    </div>
                    <div className="card--footer">
                      <p style={{ display: "inline-block" }}>
                        Already have an Videoster account? &nbsp;
                      </p>
                      <Link to="/">Sign in</Link>
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

export default connect(null, { registerUser })(Register);
