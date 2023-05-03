import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

it('renders the heading', () => {
    render(<App />);

    const heading = screen.getByText(/Drag and drop sticky notes/i);
    expect(heading).toBeInTheDocument();
});

it('renders the lists', () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoNoteList');
    const completedList = screen.getByTestId('completedNoteList');

    expect(toDoList).toBeInTheDocument();
    expect(completedList).toBeInTheDocument();
});

it('renders the sample note', () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoNoteList');
    const firstToDo = within(toDoList).getAllByRole('listitem')[0];
    expect(firstToDo).toHaveTextContent('Start my to-do list');
});

it('contains the new note input', () => {
    render(<App />);

    const newNoteInput = screen.getByTestId('newNoteInput');
    expect(newNoteInput).toBeEnabled();
});

it('allows the user to type a new note', async () => {
    render(<App />);

    const newNoteInput = screen.getByTestId('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    expect(newNoteInput.value).toBe('hello world');

    fireEvent.submit(screen.getByTestId('newNoteForm'));

    const noteList = screen.getAllByRole('listitem');

    expect(noteList[1]).toHaveTextContent('hello world');
});

it('saves the new note in the note list when the form is submitted', async () => {
    render(<App />);

    const newNoteInput = screen.getByTestId('newNoteInput');

    userEvent.type(newNoteInput, 'hello world');
    fireEvent.submit(screen.getByTestId('newNoteForm'));

    const noteList = screen.getAllByRole('listitem');

    expect(noteList[1]).toHaveTextContent('hello world');
});

it('allows users to delete a To Do note', async () => {
    render(<App />);

    const toDoList = screen.getByTestId('toDoNoteList');
    const firstToDo = within(toDoList).getAllByRole('listitem')[0];

    const removeButton = within(firstToDo).getByLabelText('Delete note');

    fireEvent.click(removeButton);

    expect(toDoList.childNodes).toHaveLength(0);
});

it.skip('allows users to delete a Completed note', async () => {
    // should test drag and drop functionality, also keyboard
});
