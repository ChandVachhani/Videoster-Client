import './style.css';

import React from "react";
import { connect } from "react-redux";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from 'react-router-dom';

import { checkLogIn } from "../../actions/index";

class Login extends React.Component {
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
        onSubmit={async (values) => {
          this.props.checkLogIn(values);
        }}
      >
        {({ isSubmitting }) => (
          <div className="card text-center ">
            <div className="card-header">
              Login
            </div>
            <div className="card-body">
              <Form>
                <div className="field">
                  userName / email
                  <Field type="userName" name="userName" />
                  <ErrorMessage name="userName" component="div" />
                </div>
                <div className="field">
                  password
                  <Field type="password" name="password" />
                  <ErrorMessage name="password" component="div" />
                </div>
                <button type="submit" className="submit btn btn-primary">
                  Submit
                </button>
              </Form>
            </div>
            <div className="card-footer">
              <Link to="/Register" >Register</Link>
            </div>
          </div>
        )}
      </Formik>
    );
  }
}

export default connect(null, { checkLogIn })(Login);