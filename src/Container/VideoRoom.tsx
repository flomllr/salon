import * as React from "react";
import Daily from "src/Components/Daily";
import styled from "styled-components";

export interface Room {
  id: string; // Same as current roomId in the Participant interface
  action: string; // Bold text
  instruction: string; // Normal text next to action
  timer?: number; // Epoch of the timer. If undefined -> no timer
  activeSpeaker?: string; // uid of the active speaker
}

interface Props {
  registerCallFrame: (frame: any) => any;
  room: Room;
}

const VideoRoom: React.FC<Props> = ({ room, registerCallFrame }) => {
  const { id: roomId, action, instruction, timer, activeSpeaker } = room;

  return (
    <Wrapper>
      <Bar>
        {action}
        {instruction}
        {timer}
        {activeSpeaker}
      </Bar>
      <Daily roomId={roomId} registerCallFrame={registerCallFrame} />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Bar = styled.div``;

export default VideoRoom;
