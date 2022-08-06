import React, { useState, useEffect, useContext } from 'react';
import { logIn, refreshToken } from './services/AuthService';
import { UserContext } from './services/userContext';
import './App.css';

function App() {
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [isSubmitted, changeIsSubmitted] = useState(false);
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (loggedInUser) {
      setInterval(refreshToken, 1000 * 60 * 60 * 12); // refresh token every 12 hours
    }
  }, [loggedInUser]);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!loggedInUser) {
        await logIn(username, password);
      }
      changeIsSubmitted(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">{loggedInUser ? `Welcome, ${loggedInUser.username}` : 'Login'}</h1>

        <p className="max-w-md mx-auto mt-4 text-center text-gray-500">
          {loggedInUser ? 'You are already logged in.' : 'Please log in to continue.'}
        </p>
        {!isSubmitted && !loggedInUser ? (
          <form onSubmit={onSubmit} className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
            <p className="text-lg font-medium">{loggedInUser ? 'Logged in' : 'Please log in'}</p>

            <div>
              <label htmlFor="username" className="text-sm font-medium">Username</label>

              <div className="relative mt-1">
                <input
                  type="input"
                  id="username"
                  onChange={(e) => changeUsername(e.target.value)}
                  value={username}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter username"
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>

              <div className="relative mt-1">
                <input
                  type="password"
                  id="password"
                  onChange={(e) => changePassword(e.target.value)}
                  value={password}
                  className="w-full p-4 pr-12 text-sm border-gray-200 rounded-lg shadow-sm"
                  placeholder="Enter password"
                />

                <span className="absolute inset-y-0 inline-flex items-center right-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </span>
              </div>
            </div>

            <button type="submit" className="block w-full px-5 py-3 text-sm font-medium text-white bg-indigo-600 rounded-lg">
              Sign in
            </button>

            <p className="text-sm text-center text-gray-500">
              No account?
              <a className="underline" href="#">Sign up</a>
            </p>
          </form>
        ) : (
          <div className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl">
            <p className="text-center text-gray-500">
              Check console for more details. And, the localStorage.
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

export default App;
