import * as React from 'react';
import {Droppable} from 'react-beautiful-dnd';
import PersonCard from './PersonCard';

const Column = (props: any) => {
    return (
        <Droppable droppableId={props.column.id}>
            {(provided) => (
                <div
                    innerRef={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {props.persons.map((person) => <PersonCard key={person.id} name={person.name} photo={person.photo} />)}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default Column;