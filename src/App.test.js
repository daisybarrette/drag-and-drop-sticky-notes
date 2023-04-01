import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders the heading', () => {
    render(<App />);
    const heading = screen.getByText(/Todo List & Notes/i);
    expect(heading).toBeInTheDocument();
});

test('renders the list of notes', () => {
    render(<App />);
    const list = document.getElementsByClassName('noteList');
    expect(list).toBeTruthy();
});

test('renders the sample note', () => {
    render(<App />);
    const noteList = document.getElementsByTagName('li');
    expect(noteList[0]).toHaveTextContent('Start my to-do list');
});

test('contains the new note input', () => {
    render(<App />);
    const newNoteInput = document.getElementById('newNoteInput');
    expect(newNoteInput).toBeEnabled();
});

test('allows the user to type a new note', async () => {
    render(<App />);
    const newNoteInput = document.getElementById('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    expect(newNoteInput.value).toBe('hello world');

    fireEvent.submit(document.getElementById('newNoteForm'));

    const noteList = document.getElementsByTagName('li');

    expect(noteList[1]).toHaveTextContent('hello world');
});

test('saves the new note in the note list when the form is submitted', async () => {
    render(<App />);
    const newNoteInput = document.getElementById('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    fireEvent.submit(document.getElementById('newNoteForm'));

    const noteList = document.getElementsByTagName('li');

    expect(noteList[1]).toHaveTextContent('hello world');
});

test('allows users to delete a note', async () => {
    render(<App />);
    const noteList = document.getElementsByTagName('li');
    const removeButton = noteList[0].childNodes[0]

    fireEvent.click(removeButton)

    expect(noteList).toHaveLength(0)
});
