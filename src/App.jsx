import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resp, changeResponse] = useState(null);
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const [isLoggedIn, changeIsLoggedIn] = useState(false);

  // check if user is logged in before onsubmit using useeffect
  useEffect(() => {
    if (localStorage.getItem('token') || localStorage.getItem('refresh')) {
      axios
        .post('http://localhost:8000/dj-rest-auth/token/verify/', {
          token: localStorage.getItem('token'),
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          credentials: 'same-origin',
          withCredentials: true,
        }).then((resp) => {
          changeIsLoggedIn(true);
          changeResponse(resp.data);
          console.log('Verified');
        }).catch(() => {
          console.log('Access token expired, refreshing token...');
          // refresh token and verify again
          return axios.post('http://localhost:8000/dj-rest-auth/token/refresh/', {
            refresh: localStorage.getItem('refresh'),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            credentials: 'same-origin',
            withCredentials: true,
          }).then((resp) => {
            changeResponse(resp);
            console.log('Refreshed');
            // store access token in js memory
            localStorage.setItem('token', resp.data.access);
            changeIsLoggedIn(true);
          }).catch((error) => console.log('error ->', error));
        });
    }
  }, []);
  // check for existing token; if not present, login. if present, verify token
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token') && !localStorage.getItem('refresh')) {
      await axios.post('http://localhost:8000/dj-rest-auth/login/', {
        username,
        password,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        credentials: 'same-origin',
        withCredentials: true,
      }).then((resp) => {
        changeResponse(resp.data);
        console.log('resp.data ->', resp.data);
        // store access token in js memory
        localStorage.setItem('token', resp.data.access_token);
        localStorage.setItem('refresh', resp.data.refresh_token);
        changeIsLoggedIn(true);
      }).catch((error) => console.log('error ->', error));
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Login (
          {isLoggedIn ? 'logged in' : 'not logged in'}
          {localStorage.getItem('token') ? `with token{${localStorage.getItem('token')}}` : ''}
          )
        </h1>
        <div className="help-text">
          Inspect the network requests in your browser to view headers returned by dj-rest-auth.
        </div>
        <div>
          {resp
            && (
            <div className="response">
              <code>
                {JSON.stringify(resp)}
              </code>
            </div>
            )}
        </div>
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
