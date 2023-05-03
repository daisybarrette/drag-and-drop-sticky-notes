import { Droppable } from 'react-beautiful-dnd';
import PropTypes from 'prop-types';

import Note from './Note';

function DroppableList({ listName,title, notes, handleRemoveNote }) {
    return (
        <Droppable droppableId={listName}>
            {(provided, snapshot) => (
                <div className='listContainer'>
                    <h2>{title}</h2>

                    <ul
                        className={snapshot.isDraggingOver ? `${listName} isBeingDraggedOver` : listName}
                        data-testid={listName}
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {provided.placeholder}
                        {notes[listName].map((note, index) => (
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
    );
}

DroppableList.propTypes = {
    listName: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    notes: PropTypes.object.isRequired,
    handleRemoveNote: PropTypes.func.isRequired,
};

export default DroppableList;
