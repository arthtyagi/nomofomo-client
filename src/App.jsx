import React, { useEffect, useContext } from 'react';
import { refreshToken } from './services/AuthService';
import { UserContext } from './services/userContext';
import Login from './components/Login';
import './App.css';

function App() {
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (loggedInUser) {
      setInterval(refreshToken, 1000 * 60 * 60 * 12); // refresh token every 12 hours
    }
  }, [loggedInUser]);

  return (
    <section className="App">
      {loggedInUser ? (
        <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
          <div className="max-w-lg mx-auto">
            <h1 className="text-2xl font-bold text-center text-indigo-600 sm:text-3xl">{`Welcome, ${loggedInUser.username}`}</h1>
          </div>
          <br />
          <div className="max-w-lg mx-auto w-1/2">
            <div className="text-sm text-center text-gray-500">
              <p className="p-8 mt-6 mb-0 space-y-4 rounded-xl shadow-2xl">
                You are already logged in.
              </p>
            </div>
          </div>
          <br />
        </div>
      ) : (
        <Login />
      )}
    </section>
  );
}

export default App;
