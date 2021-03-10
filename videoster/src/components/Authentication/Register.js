import "./style.css";

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { registerUser } from "../../actions/index";

class Register extends React.Component {
  render() {
    return (
      <div className="register-body">
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
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
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
            <center>
              <div className="auth-card text-center ">
                <div className="card-header">Register</div>
                <div className="card-body">
                  <Form>
                    <div className="field">
                      userName
                      <Field type="userName" name="userName" />
                      <ErrorMessage name="userName" component="div" />
                    </div>
                    <div className="field">
                      email
                      <Field type="email" name="email" />
                      <ErrorMessage name="email" component="div" />
                    </div>
                    <div className="field">
                      password
                      <Field type="password" name="password" />
                      <ErrorMessage name="password" component="div" />
                    </div>
                    <div className="field">
                      confirmPassword
                      <Field type="password" name="confirmPassword" />
                      <ErrorMessage name="confirmPassword" component="div" />
                    </div>
                    <button type="submit" className="submit btn btn-primary">
                      Submit
                    </button>
                  </Form>
                </div>
                <div className="card-footer">
                  <Link to="/">Login</Link>
                </div>
              </div>
            </center>
          )}
        </Formik>
      </div>
    );
  }
}

export default connect(null, { registerUser })(Register);
