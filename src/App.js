import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';

import './App.css';
import Note from './components/Note';

function Form({ addNote }) {
    const [content, setContent] = useState('');

    const newId = uuid();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        console.log('a new item is added...', content);
        addNote({
            content: content,
            id: newId,
        });

        setContent('');
    };

    return (
        <form
            id='newNoteForm'
            onSubmit={handleSubmit}
        >
            <input
                id='newNoteInput'
                className='note'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </form>
    );
}

function App() {
    const sampleNote = { content: 'Start my to-do list', id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65' };
    const [notes, setNotes] = useState([sampleNote]);

    function handleAddNote(newNote) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteIndex) {
        console.log('removing note with index: ', noteIndex);
        const updatedNotes = [...notes];
        updatedNotes.splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Todo List & Notes</h1>

                <button
                    id='addNote'
                    onClick={handleAddNote}
                >
                    {'+'}
                </button>

                <Form addNote={handleAddNote} />

                <ul className='noteList'>
                    {notes.map((note, index) => (
                        <Note
                            key={note.id} //need this
                            note={note}
                            index={index}
                            handleRemoveNote={handleRemoveNote}
                        />
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;
