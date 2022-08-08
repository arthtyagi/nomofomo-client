import { React, useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../services/userContext';
import { logOut } from '../services/AuthService';

function Home() {
  const loggedInUser = useContext(UserContext);
  const handlelogOut = async () => {
    await logOut();
  };

  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <h1 className="text-2xl font-bold text-center text-black sm:text-3xl">{`Welcome, ${loggedInUser.username}`}</h1>
      </div>
      <br />
      <div className="max-w-lg mx-auto w-1/2">
        <div className="text-sm text-center text-gray-500">
          <p className="p-8 mt-6 mb-0 space-y-4 rounded-xl shadow-2xl">
            You are now logged in.
          </p>
        </div>
      </div>
      <div className="max-w-lg mx-auto w-1/2">
        <div className="text-sm text-center text-gray-500">
          <p className="p-8 mt-6 mb-0 space-y-4 rounded-xl shadow-2xl">
            <Link to="/settings" className="text-blue-500 hover:text-blue-700">
              Go to settings
            </Link>
            {' '}
            OR
            {' '}
            <button type="button" onClick={handlelogOut} className="text-blue-500 hover:text-blue-700">
              Log out
            </button>
          </p>
        </div>
      </div>
      <br />
    </div>
  );
}

export default Home;
