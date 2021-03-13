import "./style.css";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import LoginImage from "./assets/images/Login2.svg";

import { connect } from "react-redux";
import { registerUser } from "../../actions/index";

class Register extends React.Component {
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
                    errors.userName = "Required";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  if (!values.confirmPassword) {
                    errors.confirmPassword = "Required";
                  } else if (values.password != values.confirmPassword) {
                    errors.confirmPassword = "Password dosen't match";
                  }
                  if (!values.email) {
                    errors.email = "Required";
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
                  delete values.confirmPassword;
                  await this.props.registerUser(values);
                }}
              >
                {({ isSubmitting }) => (
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
                          />
                          {/* <ErrorMessage name="userName" component="div" /> */}
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="email"
                            name="email"
                            placeholder="Email"
                          />
                          {/* <ErrorMessage name="email" component="div" /> */}
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                          {/* <ErrorMessage name="password" component="div" /> */}
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm Password"
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
                          REGISTER
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
