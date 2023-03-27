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
    const [notes, setNotes] = useState([{ content: "Start my to-do list" }]);

    function handleAddNote(newNote) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Todo List & Notes</h1>

                <button id="addNote" onClick={handleAddNote}>
                    {"+"}
                </button>

                <List notes={notes} />
            </header>
        </div>
    );
}

export default App;
