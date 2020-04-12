import * as React from "react";
import Daily from "src/Components/Daily";
import styled from "styled-components";
import { Room, Participant } from "../types";
import Ranking from "../Components/Ranking";
import Timer from "../Components/Timer";
import { SmallLogo } from "src/Components/Logo";
import { Button } from "src/Components/Button";

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
          <SmallLogo>Salon</SmallLogo>
          <TextWrapper>
            <Action>{action}</Action>
            <Instruction>{instruction}</Instruction>
          </TextWrapper>
          {timer ? <Timer until={timer} /> : <div></div>}
          {nextPartOfSequenceButtonText &&
            (!activeSpeaker || activeSpeaker === userId) && (
              <NextButton onClick={onNextPartOfSequence}>
                {nextPartOfSequenceButtonText}
              </NextButton>
            )}
        </Bar>
        <Video roomId={roomId} registerCallFrame={registerCallFrame} />
        <Sidebar>
          <Ranking
            updateRanking={updateRanking}
            ranking={ranking || []}
            participants={participants}
          />
        </Sidebar>
      </Wrapper>
      {popup && <Popup>{popup}</Popup>}
    </>
  );
};

const Wrapper = styled.div`
  display: grid;
  grid-template:
    "topbar topbar" auto
    "video sidebar" 800px / 1fr 300px;
`;
const Bar = styled.div`
  grid-area: topbar;
  display: grid;
  grid-template-columns: auto 1fr 65px auto;
  align-items: center;
  justify-content: start;
  grid-gap: 10px;
  background-color: #fff;
  padding: 20px 30px;
`;

const Video = styled(Daily)`
  grid-area: video;
  background-color: blue;
`;

const Sidebar = styled.div`
  grid-area: sidebar;
  background-color: #fff;
`;

const Action = styled.p`
  font-weight: 700;
  font-size: 20px;
`;

const Instruction = styled.p`
  font-size: 20px;
`;

const TextWrapper = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 20px;
  justify-content: center;
`;

const NextButton = styled(Button)``;

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
