import React, { useState } from 'react';
import {
  Formik, Form, Field, ErrorMessage,
} from 'formik';
import { getUser, logIn } from '../services/AuthService';
import { useUserContext, useUserDispatch } from '../services/userContext';

function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const loggedInUser = useUserContext();
  const dispatch = useUserDispatch();

  const validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    return errors;
  };
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { email, password } = values;
      await logIn(email, password);
      setIsSubmitted(true);

      if (loginError) {
        setLoginError(false);
      }

      setSubmitting(false);

      await getUser()
        .then((resp) => {
          // add delay to simulate loading
          setTimeout(() => {
            dispatch({
              type: 'SET_USER_DATA',
              userData: resp.data,
            });
            // persist user data in local storage
            localStorage.setItem('loggedInUser', JSON.stringify(resp.data));
          }, 1000);
        })
        .catch(() => {
          localStorage.removeItem('loggedInUser');
        });
    } catch (error) {
      setIsSubmitted(false);
      setLoginError(true);
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg">
        <h1 className="text-center text-3xl font-bold text-black">Sign In</h1>
        <br />
        {loginError && (
          <div className="text-center text-sm text-red-500">
            <p className="mt-6 mb-0 space-y-4 rounded-xl p-8 shadow-2xl">
              Invalid username or password.
            </p>
          </div>
        )}
        {!isSubmitted && !loggedInUser ? (
          <Formik
            initialValues={{ email: '', password: '' }}
            validate={validate}
            onSubmit={(values, { setSubmitting }) => {
              handleSubmit(values, { setSubmitting });
            }}
          >
            {({ isSubmitting }) => (
              <Form className="mt-6 mb-0 space-y-4 rounded-xl p-8 shadow-2xl">
                <label className="text-lg" htmlFor="email">
                  <div className="relative mt-1">
                    Email
                    <Field
                      className="w-full rounded-xl border-gray-200 p-4 pr-12 text-sm shadow-sm"
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Enter Email"
                    />
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-gray-300"
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
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </label>
                <br />
                <label className="text-lg" htmlFor="password">
                  Password
                  <div className="relative mt-1">
                    <Field
                      className="w-full rounded-xl border-gray-200 p-4 pr-12 text-sm shadow-sm"
                      placeholder="Enter password"
                      type="password"
                      name="password"
                      id="password"
                    />
                    <span className="absolute inset-y-0 right-4 inline-flex items-center">
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
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-sm text-red-400"
                  />
                </label>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="block w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white"
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
          <div className="mt-6 mb-0 space-y-4 rounded-xl p-8 shadow-2xl">
            <p className="text-center text-gray-500">Signing in ... 🚀</p>
          </div>
        )}
        <br />
        <p className="text-center text-gray-500">
          Open-source on
          {' '}
          <a
            className="text-center underline"
            href="https://github.com/arthtyagi/nomofomo-client/"
          >
            Github.
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
