import './style.css';

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from 'react-router-dom';

import { connect } from "react-redux";
import { registerUser } from "../../actions/index";

class Register extends React.Component {
  render() {
    return (
      <Formik
        initialValues={{
          userName: '',
          password: ''
        }}
        validate={values => {
          const errors = {};
          if (!values.userName) {
            errors.userName = 'Required';
          }
          if (!values.password) {
            errors.password = 'Required';
          }
          return errors;
        }}
        onSubmit={(values) => {
          this.props.registerUser(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="card text-center ">
            <div className="card-header">
              Register
            </div>
            <div className="card-body">
              <Form>
                <div className="field">
                  <Field type="userName" name="userName" />
                  <ErrorMessage name="userName" component="div" />
                </div>
                <div className="field">
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" className="submit btn btn-primary">
                  Submit
                </button>
              </Form>
            </div>
            <div className="card-footer">
              <Link to="/" >Login</Link>
            </div>
          </div>
        )}
      </Formik>
    )
  }
}

export default connect(null, { registerUser })(Register);