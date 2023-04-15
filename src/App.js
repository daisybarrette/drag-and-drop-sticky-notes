import React, { useEffect, useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import Note from './components/Note';
import Form from './components/Form';

const sampleNote = {
    content: 'Start my to-do list',
    id: '5ee6395a-0ba2-4ab5-9230-de8325e5dd65',
    list: 'toDoNoteList',
};

function App() {
    // const storedNotes = JSON.parse(localStorage.getItem('myTest'))
    // console.log('my test item...........', myTest);

    const [notes, setNotes] = useState({ toDoNoteList: [], completedNoteList: [] });

    // useEffect(() => {
    //     const items = JSON.parse(localStorage.getItem('items'));
    //     if (items) {
    //      setItems(items);
    //     }
    //   }, []);

    useEffect(() => {
        const stringNotes = localStorage.getItem('notes');
        const storedNotes = JSON.parse(JSON.parse(localStorage.getItem('notes')));

        console.log('the stored notes...........');
        console.log(stringNotes, typeof stringNotes);
        console.log('does this work', storedNotes, typeof storedNotes);
        console.log('...........');

        const updatedNotes = { toDoNoteList: [], completedNoteList: [] };


        if (storedNotes?.toDoNoteList?.length) {
            console.log('okay so', storedNotes);
            updatedNotes.toDoNoteList = storedNotes.toDoNoteList;
        }

        if (storedNotes?.completedNoteList?.length) {
            console.log('okay so', storedNotes);
            updatedNotes.completedNoteList = storedNotes.completedNoteList;
        }

        setNotes(updatedNotes);

        // if (!storedNotes) {
        //     setNotes({ toDoNoteList: [sampleNote], completedNoteList: [] });
        // }

        // if (storedNotes?.toDoNoteList?.length) {
        //     console.log(storedNotes?.toDoNoteList);
        // }
    }, []);

    useEffect(() => {
        // console.log('notes', notes)

        const notesToSave = JSON.stringify(notes);
        // console.log('these should be saved',notesToSave)

        localStorage.setItem('notes', JSON.stringify(notesToSave));
    }, [notes]);

    function handleAddNote(newNote) {
        const updatedNotes = {
            toDoNoteList: [...notes.toDoNoteList, newNote],
            completedNoteList: [...notes.completedNoteList],
        };

        setNotes(updatedNotes);
    }

    function handleRemoveNote(noteList, noteIndex) {
        const updatedNotes = {
            toDoNoteList: [...notes.toDoNoteList],
            completedNoteList: [...notes.completedNoteList],
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
            toDoNoteList: [...notes.toDoNoteList],
            completedNoteList: [...notes.completedNoteList],
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
                        <Droppable droppableId='toDoNoteList'>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>To do:</h2>

                                    <ul
                                        className={
                                            snapshot.isDraggingOver ? 'toDoNoteList isBeingDraggedOver' : 'toDoNoteList'
                                        }
                                        {...provided.droppableProps}
                                        ref={provided.innerRef}
                                    >
                                        {provided.placeholder}
                                        {notes.toDoNoteList?.map((note, index) => (
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

                        <Droppable droppableId='completedNoteList'>
                            {(provided, snapshot) => (
                                <div className='listContainer'>
                                    <h2>Completed:</h2>

                                    <ul
                                        className={
                                            snapshot.isDraggingOver
                                                ? 'completedNoteList isBeingDraggedOver'
                                                : 'completedNoteList'
                                        }
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
