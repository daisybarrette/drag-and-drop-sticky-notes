import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

// @TODO add proptypes

function Note({ note, index, handleRemoveNote }) {
    return (
        <Draggable
            key={note.id}
            draggableId={note.id}
            index={index}
        >
            {(provided) => (
                <li
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    index={index}
                    key={note.id}
                >
                    <button
                        className='removeNote'
                        type='button'
                        aria-label='Delete note'
                        onClick={() => handleRemoveNote(note.list, index)}
                    >
                        <svg
                            width='15'
                            height='15'
                            viewBox='0 0 44 44'
                            aria-hidden='true'
                            focusable='false'
                        >
                            <path d='M0.549989 4.44999L4.44999 0.549988L43.45 39.55L39.55 43.45L0.549989 4.44999Z' />
                            <path d='M39.55 0.549988L43.45 4.44999L4.44999 43.45L0.549988 39.55L39.55 0.549988Z' />
                        </svg>
                    </button>
                    <div className='note'>{`${note.content}`}</div>
                </li>
            )}
        </Draggable>
    );
}

export default Note;
