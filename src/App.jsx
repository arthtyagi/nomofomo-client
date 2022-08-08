import React, { useEffect, useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import { refreshToken } from './services/AuthService';
import { UserContext } from './services/userContext';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Settings from './components/Settings';
import Home from './components/Home';
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
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Login />} />
        </Routes>
      )}
    </section>
  );
}

export default App;
