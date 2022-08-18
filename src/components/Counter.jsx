import React, { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  return (
    <>
      <div className="table-header-group">
        <h1>NomoFOMO.lol</h1>
      </div>
      <div className="flex h-screen">
        <div className="card m-auto">
          <div className="text-6xl text-red-600">{count}</div>
          <button
            className="rounded bg-red-200 px-6 py-2 text-black hover:bg-green-600"
            type="button"
            onClick={() => setCount((count) => count + 1)}
          >
            count+
          </button>
        </div>
      </div>
    </>
  );
}
export default Counter;
