import * as React from 'react';
import {Card, Icon, Image } from 'semantic-ui-react';
import { Draggable } from 'react-beautiful-dnd'

const PersonCard = (props: any) => {
    return (
        <Draggable draggableId={props.person.id} index={props.index}>
            <Card style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
                <Card.Content>
                    <Card.Header>{props.ranking})</Card.Header>
                </Card.Content>
                <Image size="tiny" src={props.photo} circular centered/>
                <Card.Content>
                    <Card.Header>{props.name}</Card.Header>
                </Card.Content>
            </Card>
        </Draggable>
    );
};

export default PersonCard