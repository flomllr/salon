import * as React from "react";
import Daily from "src/Components/Daily";
import styled from "styled-components";
import { Room, Participant } from "../types";
import Ranking from "../Components/Ranking";

interface Props {
  registerCallFrame: (frame: any) => any;
  room: Room;
  participants: Participant[];
  userId?: string;
  updateRanking: (ranking: any[]) => any;
}

const VideoRoom: React.FC<Props> = ({
  room,
  registerCallFrame,
  participants,
  userId,
  updateRanking,
}) => {
  const { id: roomId, action, instruction, timer, activeSpeaker } = room;
  const { ranking } = participants.find((p) => p.uid === userId) || {};

  return (
    <Wrapper>
      <Bar>
        {action}
        {instruction}
        {timer}
        {activeSpeaker}
      </Bar>
      <Daily roomId={roomId} registerCallFrame={registerCallFrame} />
      <Ranking
        updateRanking={updateRanking}
        ranking={ranking || []}
        participants={participants}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div``;
const Bar = styled.div``;

export default VideoRoom;
