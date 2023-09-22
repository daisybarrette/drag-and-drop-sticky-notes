import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';

import Form from './components/Form';
import DroppableList from './components/DroppableList';

const LIST_NAMES = {
    TO_DO: 'toDoNoteList',
    COMPLETED: 'completedNoteList',
};

const sampleNote = {
    content: 'Start my to-do list',
    id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65',
    list: LIST_NAMES.TO_DO,
};

const defaultNotes = { [LIST_NAMES.TO_DO]: [sampleNote], [LIST_NAMES.COMPLETED]: [] };

function App() {
    const [notes, setNotes] = useState(() => {
        const savedNoteData = localStorage.getItem('userNotes');
        const initialValue = savedNoteData ? JSON.parse(savedNoteData) : null;

        return initialValue || defaultNotes;
    });

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

    useEffect(() => {
        localStorage.removeItem('userNotes');
        localStorage.setItem('userNotes', JSON.stringify(notes));
    }, [notes]);

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
                        <DroppableList
                            listName={LIST_NAMES.TO_DO}
                            title='To do:'
                            notes={notes}
                            handleRemoveNote={handleRemoveNote}
                        />

                        <DroppableList
                            listName={LIST_NAMES.COMPLETED}
                            title='Completed:'
                            notes={notes}
                            handleRemoveNote={handleRemoveNote}
                        />
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
