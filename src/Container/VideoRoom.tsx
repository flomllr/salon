import * as React from "react";
import Daily from "src/Components/Daily";
import styled from "styled-components";
import { Room, Participant } from "../types";
import Ranking from "../Components/Ranking";
import Timer from "../Components/Timer";

interface Props {
  registerCallFrame: (frame: any) => any;
  room: Room;
  participants: Participant[];
  userId?: string;
  updateRanking: (ranking: any[]) => any;
  onNextPartOfSequence: () => any;
}

const VideoRoom: React.FC<Props> = ({
  room,
  registerCallFrame,
  participants,
  userId,
  updateRanking,
  onNextPartOfSequence,
}) => {
  const {
    id: roomId,
    action,
    instruction,
    timer,
    activeSpeaker,
    nextPartOfSequenceButtonText,
    popup,
  } = room;
  const { ranking } = participants.find((p) => p.uid === userId) || {};

  return (
    <>
      <Wrapper>
        <Bar>
          {action}
          {instruction}
          {timer && <Timer until={timer} />}
          Active Speaker: {activeSpeaker}
          {nextPartOfSequenceButtonText &&
            (!activeSpeaker || activeSpeaker === userId) && (
              <NextButton onClick={onNextPartOfSequence}>
                {nextPartOfSequenceButtonText}
              </NextButton>
            )}
        </Bar>
        <Daily roomId={roomId} registerCallFrame={registerCallFrame} />
        <Ranking
          updateRanking={updateRanking}
          ranking={ranking || []}
          participants={participants}
        />
      </Wrapper>
      {popup && <Popup>{popup}</Popup>}
    </>
  );
};

const Wrapper = styled.div``;
const Bar = styled.div``;
const NextButton = styled.button``;
const Popup = styled.div`
  position: fixed;
  background-color: #fff;
  width: 50vw;
  height: 50vh;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export default VideoRoom;
