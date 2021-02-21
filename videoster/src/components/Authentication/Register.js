import './style.css';

import React from "react";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { Link } from 'react-router-dom';

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
        onSubmit={(values) => {
          console.log(values);
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

export default Login;