import "./style.css";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";

import LoginImage from "./assets/images/Login2.svg";

import { takeMeIn, verifyLogin } from "../../actions/index";

import history from "../../history";

class Login extends React.Component {
  async componentDidMount() {
    if (this.props.user.userId) {
      history.push("/LandingPlace");
    }
  }

  componentDidUpdate() {
    if (this.props.user.userId) {
      history.push("/LandingPlace");
    }
  }

  render() {
    return (
      <div className="login-body">
        <center>
          <Row className="auth-card">
            <Col md={6}>
              <div className="login-image">
                <img src={LoginImage} alt="Login" />
              </div>
            </Col>
            <Col md={6}>
              <Formik
                initialValues={{
                  userName: "",
                  password: "",
                }}
                validate={(values) => {
                  const errors = {};
                  if (!values.userName) {
                    errors.userName = "Required";
                  }
                  if (!values.password) {
                    errors.password = "Required";
                  }
                  return errors;
                }}
                onSubmit={async (values) => {
                  await this.props.takeMeIn(values);
                }}
              >
                {({ isSubmitting }) => (
                  <div className="card--main text-center">
                    <div className="card--header">
                      <h1>LOGIN</h1>
                    </div>
                    <div className="card--subheading">
                      <p>Please Enter your Login and Password</p>
                    </div>
                    <div className="card--body">
                      <Form>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="userName"
                            name="userName"
                          />
                          {/* <ErrorMessage name="userName" component="div" /> */}
                        </div>
                        <div className="field">
                          <Field
                            className="field--input"
                            type="password"
                            name="password"
                          />
                          {/* <ErrorMessage name="password" component="div" /> */}
                        </div>
                        <div className="card--forgot">
                          <a href="#">Forgot password?</a>
                        </div>
                        <button type="submit" className="submit">
                          Submit
                        </button>
                      </Form>
                    </div>
                    <div className="card--footer">
                      <Link to="/Register">Register</Link>
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

export default connect(mapStateToProps, { takeMeIn, verifyLogin })(Login);
