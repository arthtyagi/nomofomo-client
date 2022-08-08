import React, { useState, useContext } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { getUser, logIn } from '../services/AuthService';
import { UserContext, UserDispatch } from '../services/userContext';

function Login() {
  const [isSubmitted, changeIsSubmitted] = useState(false);
  const loggedInUser = useContext(UserContext);
  const dispatch = useContext(UserDispatch);

  // const onSubmit = async (e, values) => {
  //   e.preventDefault();
  //   const { email } = values;
  //   const { password } = values;
  //   if (!loggedInUser) {
  //     try {
  //       await logIn(email, password);
  //       changeIsSubmitted(true);
  //       getUser().then((resp) => {
  //       // add delay to simulate loading
  //         setTimeout(() => {
  //           dispatch({ type: 'SET_USER_DATA', userData: resp.data });
  //           localStorage.setItem('loggedIn', true);
  //         }, 1500);
  //       }).catch(() => {
  //         localStorage.setItem('loggedIn', false);
  //       });
  //     } catch (error) {
  //       changeIsSubmitted(false);
  //       changeEmail('');
  //       changePassword('');
  //     }
  //   }
  // };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-light text-center text-black sm:text-3xl">Sign In</h1>
        {!isSubmitted && !loggedInUser ? (
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={(values) => {
              const errors = {};
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
              }
              return errors;
            }}
            onSubmit={async (values, { setSubmitting }) => {
              if (!loggedInUser) {
                try {
                  const { email, password } = values;
                  await logIn(email, password);
                  changeIsSubmitted(true);
                  setSubmitting(false);
                  getUser().then((resp) => {
                    // add delay to simulate loading
                    setTimeout(() => {
                      dispatch({ type: 'SET_USER_DATA', userData: resp.data });
                      localStorage.setItem('loggedIn', true);
                    }, 1500);
                  }).catch(() => {
                    localStorage.setItem('loggedIn', false);
                  });
                } catch (error) {
                  changeIsSubmitted(false);
                }
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
                <label htmlFor="email" className="text-sm font-medium">
                  Email
                  <div className="relative mt-1">
                    <Field
                      className="w-full p-4 pr-12 text-sm border-gray-200 rounded-xl shadow-sm"
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                    />
                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                        />
                      </svg>
                    </span>
                  </div>
                </label>
                <ErrorMessage name="email" component="div" />
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                  <div className="relative mt-1">
                    <Field
                      className="w-full p-4 pr-12 text-sm border-gray-200 rounded-xl shadow-sm"
                      placeholder="Enter password"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <span className="absolute inset-y-0 inline-flex items-center right-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-gray-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                      </svg>
                    </span>
                  </div>
                </label>
                <ErrorMessage name="password" component="div" />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-full px-5 py-3 text-sm font-medium text-white bg-blue-600 rounded-xl"
                >
                  <span>
                    SIGN IN
                    {' '}
                    <span className="text-xs">✨</span>
                  </span>
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          <div className="p-8 mt-6 mb-0 space-y-4 rounded-xl shadow-2xl">
            <p className="text-center text-gray-500">
              Logging in ...
            </p>
          </div>
        )}
        <br />
        <p className="text-center text-gray-500">
          Open-source on
          {' '}
          <a className="underline text-center" href="https://github.com/arthtyagi/nomofomo-client/">Github.</a>
        </p>
      </div>
    </div>

  );
}

export default Login;
