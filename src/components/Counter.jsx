import React, { useState } from "react";
const Counter = () => {
    const [count, setCount] = useState(0)
    return (
        <>
        <div className="table-header-group">
            <h1>NomoFOMO.lol</h1>
        </div>
        <div className="flex h-screen">

            <div className="m-auto card">
                <div className="text-6xl text-red-600">{count}</div>
                <button className="px-6 py-2 rounded bg-red-200 hover:bg-green-600 text-black" type="button" onClick={() => setCount((count) => count + 1)}>
                    count+
                </button>
            </div>
        </div>
        </>
    )
}
export default Counter;