import * as React from "react";
import { Participant } from "../types";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { shadow, colors } from "../theme";
import Person from "./Person";
import styled from "styled-components";

interface Props {
  ranking: any[];
  participants: Participant[];
  updateRanking: (ranking: any[]) => any;
}

const Ranking: React.FC<Props> = ({ ranking, updateRanking, participants }) => {
  const grid = 8;

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging

    boxShadow: isDragging ? shadow : undefined,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const getListStyle = (isDraggingOver: boolean) => ({
    padding: grid,
  });

  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newRanking = reorder(
      ranking,
      result.source.index,
      result.destination.index
    );

    updateRanking(newRanking as string[]);
  };

  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  return (
    <Wrapper>
      <Infobox>
        <Private>🔒 Private</Private>
        <h3>Your Ranking</h3>
        <p>
          Those are the people you want to speak to the most. We’ll do our best
          to match you with them in case of mutual interest.
        </p>
        <p>Reorder by drag and drop.</p>
      </Infobox>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
              {ranking.map((item, index) => (
                <Draggable key={item} draggableId={item} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <Person
                        person={participants.find((p) => p.uid === item)}
                        index={index}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 5px solid ${colors.lightgray};
`;
const Infobox = styled.div`
  padding: 20px;
`;

const Private = styled.h3`
  color: ${colors.gray};
`;
export default Ranking;
