import React, { useState } from 'react';
import './App.css';
import Note from './components/Note';

function Form({ addNote }) {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        console.log('a new item is added...', content);
        addNote({
            content: content,
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
    const [notes, setNotes] = useState([{ content: 'Start my to-do list' }]);

    function handleAddNote(newNote) {
        const updatedNotes = [...notes, newNote];
        setNotes(updatedNotes);
    }

    // function handleRemoveNote(noteIndex) {
    //     console.log('removing note with index: ', noteIndex);
    //     const updatedNotes = [...notes];
    //     updatedNotes.splice(noteIndex, 1);
    //     setNotes(updatedNotes);
    // }

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
                            note={note}
                            index={index}
                        />
                    ))}
                </ul>
            </header>
        </div>
    );
}

export default App;
