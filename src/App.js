import React, { useState } from 'react';
import { v4 as uuid } from 'uuid';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Note from './components/Note';

function Form({ addNote }) {
    const [content, setContent] = useState('');

    const newId = uuid();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!content) {
            return;
        }
        addNote({
            content: content,
            id: newId,
            list: 'toDo',
        });

        setContent('');
    };

    return (
        <form
            id='newNoteForm'
            onSubmit={handleSubmit}
        >
            <label htmlFor='newNoteInput'>Add a new note: </label>
            <input
                id='newNoteInput'
                type='text'
                value={content}
                onChange={(e) => setContent(e.target.value)}
            />
        </form>
    );
}

function App() {
    const sampleNote = { content: 'Start my to-do list', id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65', list: 'toDo' };
    const sampleCompletedNote = { content: 'buy groceries', id: '19e6395a-0ba2-4ab5-x230-7e8325e5dd4a', list: 'done' };

    const [notes, setNotes] = useState({ toDo: [sampleNote], done: [sampleCompletedNote] });

    function handleAddNote(newNote) {
        const updatedNotes = {
            toDo: [...notes.toDo, newNote],
            done: [...notes.done],
        }

        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteList, noteIndex) {
        const updatedNotes = {
            toDo: [...notes.toDo],
            done: [...notes.done],
        }

        updatedNotes[noteList].splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    function handleOnDragEnd(result) {
        const { destination, source, draggableId } = result;
        // console.log('done dragging', result);

        // if (!destination) {
        //     return;
        // }

        // if (destination.droppableId === source.droppableId && destination.index === source.index) {
        //     return;
        // }

        // console.log(notes)
        // const droppedNote = notes.find(note => note.id === draggableId)
        // const droppedNoteIndex = notes.indexOf(droppedNote)

        // const list = source.droppableId === 'toDoNoteList'
        //     ? notes
        //     :

        // console.log(droppedNote)

        // const updatedNotes = [...notes];
        // updatedNotes.splice(droppedNoteIndex, 1);
        // updatedNotes.splice(destination.index, 0, droppedNote)
        // setNotes(updatedNotes);
    }

    return (
        <div className='App'>
            <header className='App-header'>
                <h1>Todo List & Notes</h1>
            </header>

            <main>
                <Form addNote={handleAddNote} />

                <h2>To do:</h2>
                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <Droppable droppableId='toDoNoteList'>
                        {(provided) => (
                            <ul
                                className='noteList'
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                            >
                                {provided.placeholder}
                                {notes.toDo.map((note, index) => (
                                    <Note
                                        key={note.id}
                                        note={note}
                                        index={index}
                                        handleRemoveNote={handleRemoveNote}
                                    />
                                ))}
                            </ul>
                        )}
                    </Droppable>
                </DragDropContext>
            </main>
        </div>
    );
}

export default App;
