import axios from 'axios';

export default function getUser() {
  const token = localStorage.getItem('token');
  if (token) {
    // return user data
    return axios.get('http://localhost:8000/dj-rest-auth/user/', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp).catch((error) => console.log('error ->', error));
  }
  return null;
}
