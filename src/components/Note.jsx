import React from 'react';
// @TODO add proptypes

function Note({ note, index, handleRemoveNote }) {
    return (
        <li
            key={index}
            className='note'
        >
            {/* <button className='removeNote'>{'x'}</button> */}
            {`${note.content}`}
        </li>
    );
}

export default Note;
