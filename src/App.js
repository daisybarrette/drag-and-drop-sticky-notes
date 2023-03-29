import React, { useState } from "react";
import "./App.css";

function List({ notes }) {
    console.log(notes);
    return (
        <ul className="noteList">
            {notes.map((note, index) => (
                <li key={index} className="note">{`${note.content}`}</li>
            ))}
        </ul>
    );
}

function Form({ addNote }) {
    const [content, setContent] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        console.log("a new item is added...", content);
        addNote({
            content: content,
        });

        setContent("")
    };

    return (
        <form id="newNoteForm" onSubmit={handleSubmit}>
            <input id="newNoteInput" className="note" type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        </form>
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

                <Form addNote={handleAddNote} />


                <List notes={notes} />

            </header>
        </div>
    );
}

export default App;
