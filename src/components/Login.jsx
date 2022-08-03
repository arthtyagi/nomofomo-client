import React, { useState } from 'react';

function Counter() {
  const [isLoggedin, setisLoggedin] = useState(false);
  return (
    <>
      <div className="table-header-group">
        <h1>NomoFOMO.lol</h1>
      </div>
      <div className="flex h-screen">
        <div className="m-auto card">
          <button
            className="px-6 py-2 rounded bg-red-200 hover:bg-green-600 text-black"
            type="button"
            onClick={() => setisLoggedin(!isLoggedin)}
          >
            {' '}
            {isLoggedin ? 'Logout' : 'Login'}
          </button>
        </div>
      </div>
    </>
  );
}
export default Counter;
