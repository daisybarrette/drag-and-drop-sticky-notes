import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
    render(<App />);
});

it('renders the heading', () => {
    const heading = screen.getByText(/Drag and drop sticky notes/i);
    expect(heading).toBeInTheDocument();
});

it('renders the list of notes', () => {
    const list = document.getElementsByClassName('noteList');
    expect(list).toBeTruthy();
});

it('renders the sample note', () => {
    const noteList = document.getElementsByTagName('li');
    expect(noteList[0]).toHaveTextContent('Start my to-do list');
});

it('contains the new note input', () => {
    const newNoteInput = document.getElementById('newNoteInput');
    expect(newNoteInput).toBeEnabled();
});

it('allows the user to type a new note', async () => {
    const newNoteInput = document.getElementById('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    expect(newNoteInput.value).toBe('hello world');

    fireEvent.submit(document.getElementById('newNoteForm'));

    const noteList = document.getElementsByTagName('li');

    expect(noteList[1]).toHaveTextContent('hello world');
});

it('saves the new note in the note list when the form is submitted', async () => {
    const newNoteInput = document.getElementById('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    fireEvent.submit(document.getElementById('newNoteForm'));

    const noteList = document.getElementsByTagName('li');

    expect(noteList[1]).toHaveTextContent('hello world');
});

it('allows users to delete a To Do note', async () => {
    const toDoNoteList = document.getElementsByClassName('toDoNoteList')[0].getElementsByTagName('li');
    const removeButton = toDoNoteList[0].childNodes[0];

    fireEvent.click(removeButton);

    expect(toDoNoteList).toHaveLength(0);
});

it.skip('allows users to delete a Completed note', async () => {
    // should test drag and drop functionality, also keyboard
});
