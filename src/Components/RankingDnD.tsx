import * as React from 'react';
import {DragDropContext} from 'react-beautiful-dnd';
import PersonCard from './PersonCard';
import Column from './Column';

class RankingDnD extends React.Component{
    state = {
        column:{
            id: 'column-1',
            personIds: ['justin', 'jay', 'florian'],
        },
        persons:{
            'justin': {
                id: 'justin', 
                name: 'Justin',
                photo: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80'
            },
            'jay': {
                id: 'jay', 
                name: 'Jay',
                photo: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80'
            },
            'florian': {
                id: 'florian', 
                name: 'Florian',
                photo: 'https://images.unsplash.com/photo-1520451644838-906a72aa7c86?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=474&q=80'
            },
        },
        columnOrder: ['column-1'],
    }

    onDragEnd = (results) => {

    };

    render(){
        const column = this.state.column;
        const persons = column.personIds.map((personId) => this.state.persons[personId]);
        
        return (
        <DragDropContext onDragEnd={this.onDragEnd}>
            <Column key={column.id} column={column} persons={persons} />
        </DragDropContext>
        );
    }
}

export default RankingDnD