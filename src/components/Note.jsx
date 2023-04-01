import React from 'react';
// @TODO add proptypes

function Note({ note, index, handleRemoveNote }) {
    return (
        <li
            key={`note-${index}`} //@TODO hash the content here for a better key
            className='note'
        >
            {/* <button className='removeNote'>{'x'}</button> */}
            {`${note.content}`}
        </li>
    );
}

export default Note;
