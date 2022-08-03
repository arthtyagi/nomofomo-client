import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from './services/userContext';
import './App.css';

function App() {
  const [resp, changeResponse] = useState(null);
  const [username, changeUsername] = useState('');
  const [password, changePassword] = useState('');
  const loggedInUser = useContext(UserContext);
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };
  const logIn = async (username, password) => {
    const url = 'http://localhost:8000/dj-rest-auth/login/';
    const response = await axios.post(url, {
      username,
      password,
      headers,
      credentials: 'same-origin',
      withCredentials: true,
    }).then((resp) => {
      changeResponse(resp.data);
      // console.log('resp.data ->', resp.data);
      localStorage.setItem('token', resp.data.access_token);
      localStorage.setItem('refresh', resp.data.refresh_token);
    }).catch((error) => console.log('error ->', error));
    return response;
  };

  // todo: verify only after a specified interval:
  useEffect(() => {
    if (localStorage.getItem('token') || localStorage.getItem('refresh')) {
      axios
        .post('http://localhost:8000/dj-rest-auth/token/verify/', {
          token: localStorage.getItem('token'),
          headers,
          credentials: 'same-origin',
          withCredentials: true,
        }).then((resp) => {
          changeResponse(resp.data);
          console.log('Verified');
        }).catch((e) => {
          console.log(e);
          // refresh token and verify again
          return axios.post('http://localhost:8000/dj-rest-auth/token/refresh/', {
            refresh: localStorage.getItem('refresh'),
            headers,
            credentials: 'same-origin',
            withCredentials: true,
          }).then((resp) => {
            changeResponse(resp);
            console.log('Refreshed');
            // store access token in js memory
            localStorage.setItem('token', resp.data.access);
          }).catch((error) => console.log('error ->', error));
        });
    }
  }, []);
  // check for existing token; if not present, login. if present, verify token
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!localStorage.getItem('token') && !localStorage.getItem('refresh')) {
      try {
        logIn(username, password);
      } catch (e) {
        console.log(e);
      }
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>
          {loggedInUser ? `Welcome, ${loggedInUser.username}` : 'Login'}
        </h1>
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
