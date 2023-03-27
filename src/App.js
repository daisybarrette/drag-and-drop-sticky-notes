import React, { useState } from "react";
import "./App.css";

function App() {
    const [count, setCount] = useState(0);

    function handleClick() {
        setCount(count + 1);
        console.log("the button was clicked");
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Todo List & Notes</h1>

                <button id="countButton" onClick={handleClick}>
                    {"+"}
                </button>

                <h2 id="countText">{`The button has been clicked ${count} times`}</h2>
            </header>
        </div>
    );
}

export default App;
