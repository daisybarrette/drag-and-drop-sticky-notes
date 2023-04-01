import React from 'react';
// @TODO add proptypes

function Note({ note, index, handleRemoveNote }) {
    return (
        <li
            key={note.id}
            className='note'
        >
            <button
                className='removeNote'
                onClick={() => handleRemoveNote(index)}
            >
                {'x'}
            </button>
            {`${note.content}`}
        </li>
    );
}

export default Note;
