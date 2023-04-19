import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Note from './components/Note';
import Form from './components/Form';

const LIST_NAMES = {
    TO_DO: 'toDoNoteList',
    COMPLETED: 'completedNoteList',
}

function App() {
    const sampleNote = {
        content: 'Start my to-do list',
        id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65',
        list: LIST_NAMES.TO_DO,
    };

    const [notes, setNotes] = useState({ [LIST_NAMES.TO_DO]: [sampleNote], [LIST_NAMES.COMPLETED]: [] });

    function handleAddNote(newNote) {
        const updatedNotes = {
            [LIST_NAMES.TO_DO]: [...notes[LIST_NAMES.TO_DO], newNote],
            [LIST_NAMES.COMPLETED]: [...notes[LIST_NAMES.COMPLETED]],
        };

        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteList, noteIndex) {
        const updatedNotes = {
            [LIST_NAMES.TO_DO]: [...notes[LIST_NAMES.TO_DO]],
            [LIST_NAMES.COMPLETED]: [...notes[LIST_NAMES.COMPLETED]],
        };

        updatedNotes[noteList].splice(noteIndex, 1);
        setNotes(updatedNotes);
    }

    function handleOnDragEnd(result) {
        const { destination, source } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        const sourceList = source.droppableId;
        const destinationList = destination.droppableId;
        const droppedNote = notes[sourceList][source.index];

        const updatedNotes = {
            [LIST_NAMES.TO_DO]: [...notes[LIST_NAMES.TO_DO]],
            [LIST_NAMES.COMPLETED]: [...notes[LIST_NAMES.COMPLETED]],
        };

        updatedNotes[sourceList].splice(source.index, 1);
        updatedNotes[destinationList].splice(destination.index, 0, { ...droppedNote, list: destinationList });

        setNotes(updatedNotes);
    }

    return (
        <div className='App'>
            <header>
                <h1>Drag and drop sticky notes</h1>
            </header>

            <main>
                <Form addNote={handleAddNote} />

                <DragDropContext onDragEnd={handleOnDragEnd}>
                    <div className='listLayout'>
                        <Droppable droppableId={LIST_NAMES.TO_DO}>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>To do:</h2>

                                    <ul
                                        className={snapshot.isDraggingOver ? 'toDoNoteList isBeingDraggedOver':'toDoNoteList'}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {provided.placeholder}
                                        {notes.toDoNoteList.map((note, index) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleRemoveNote={handleRemoveNote}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Droppable>

                        <Droppable droppableId={LIST_NAMES.COMPLETED}>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>Completed:</h2>

                                    <ul
                                        className={snapshot.isDraggingOver ? 'completedNoteList isBeingDraggedOver':'completedNoteList'}
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {provided.placeholder}
                                        {notes.completedNoteList.map((note, index) => (
                                            <Note
                                                key={note.id}
                                                note={note}
                                                index={index}
                                                handleRemoveNote={handleRemoveNote}
                                            />
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </main>

            <footer>
                <p>
                    by <a href='https://www.daisybarrette.com/'>Daisy Barrette</a> on{' '}
                    <a href='https://github.com/daisybarrette/drag-and-drop-sticky-notes'>GitHub</a>
                </p>
            </footer>
        </div>
    );
}

export default App;
