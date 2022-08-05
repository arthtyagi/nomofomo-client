import React, { useState, useEffect, useContext } from 'react';
import { logIn, refreshToken } from './services/AuthService';
import { UserContext } from './services/userContext';
import './App.css';

function App() {
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const loggedInUser = useContext(UserContext);

  useEffect(() => {
    if (loggedInUser) {
      setInterval(refreshToken, 1000 * 60 * 60 * 12); // refresh token every 12 hours
    }
  }, [loggedInUser]);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      await logIn(username, password);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {loggedInUser ? `Welcome, ${loggedInUser.username}` : 'Login'}
        </h1>
        <div>
          <form onSubmit={onSubmit}>
            <div>
              <input
                onChange={(e) => changeUsername(e.target.value)}
                value={username}
                type="input"
                name="username"
              />
            </div>
            <div>
              <input
                onChange={(e) => changePassword(e.target.value)}
                value={password}
                type="password"
                name="password"
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </header>
    </div>
  );
}

export default App;
