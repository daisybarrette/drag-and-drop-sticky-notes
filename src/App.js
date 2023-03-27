import React, { useState } from "react";
import "./App.css";

function List({ notes }) {
    console.log(notes);
    return (
        <ul className="noteList">
            {notes.map((note, index) => (
                <li key={index}>{`${note.content}`}</li>
            ))}
        </ul>
    );
}

function App() {
    const [count, setCount] = useState(0);
    const [notes, setNotes] = useState([{ content: "Start my to-do list" }]);

    function handleClick() {
        setCount(count + 1);
        console.log("the button was clicked");
    }

    function handleAddNote(newNote) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Todo List & Notes</h1>

                <button id="countButton" onClick={handleClick}>
                    {"+"}
                </button>

                <h2 id="countText">{`The button has been clicked ${count} times`}</h2>

                <button id="addNote" onClick={handleAddNote}>
                    {"+"}
                </button>

                <List notes={notes} />
            </header>
        </div>
    );
}

export default App;
