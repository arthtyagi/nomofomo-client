import axios from 'axios';

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
};

export async function getUser() {
  const token = localStorage.getItem('token');
  if (token) {
    // return user data
    return axios.get('http://localhost:8000/dj-rest-auth/user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp).catch(() => {});
  }
  return null;
}

export async function logIn(email, password) {
  const url = 'http://localhost:8000/dj-rest-auth/login/';
  const response = await axios.post(url, {
    email,
    password,
    headers,
    credentials: 'same-origin',
    withCredentials: true,
  }).then((resp) => {
    // console.log('resp.data ->', resp.data);
    localStorage.setItem('token', resp.data.access_token);
    localStorage.setItem('refresh', resp.data.refresh_token);
  });
  return response;
}

export async function refreshToken() {
  const url = 'http://localhost:8000/dj-rest-auth/token/refresh/';
  const response = await axios.post(url, {
    refresh: localStorage.getItem('refresh'),
    headers,
    credentials: 'same-origin',
    withCredentials: true,
  }).then((resp) => {
    // console.log('resp.data ->', resp.data);
    localStorage.setItem('token', resp.data.access);
  }).catch(() => {});
  return response;
}

export async function logOut() {
  const url = 'http://localhost:8000/dj-rest-auth/logout/';
  const response = await axios.post(url, {
    headers,
    credentials: 'same-origin',
    withCredentials: true,
  }).then(() => {
    // console.log('resp.data ->', resp.data);
    localStorage.removeItem('token');
    localStorage.removeItem('refresh');
    localStorage.removeItem('loggedIn');
    window.location.href = '/';
  }).catch(() => {});
  return response;
}
