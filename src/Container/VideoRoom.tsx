import * as React from "react";
import Daily from "src/Components/Daily";
import styled from "styled-components";
import { Room, Participant } from "../types";
import Ranking from "../Components/Ranking";
import Timer from "../Components/Timer";
import { SmallLogo } from "src/Components/Logo";
import { Button } from "src/Components/Button";
import { shadow } from "../theme";
import Person from "../Components/Person";
import Like from "../Components/Like";
import { colors } from "../theme";
import Space from "src/Components/Space";

interface Props {
  registerCallFrame: (frame: any) => any;
  room: Room;
  participants: Participant[];
  userId?: string;
  updateRanking?: (ranking: any[]) => any;
  onNextPartOfSequence: () => any;
  mode?: string;
  like?: (uid: string) => any;
}

const VideoRoom: React.FC<Props> = ({
  room,
  registerCallFrame,
  participants,
  userId,
  updateRanking,
  onNextPartOfSequence,
  mode,
  like,
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
  console.log(mode);

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
          {activeSpeaker && (
            <SpeakerBox important={activeSpeaker === userId}>
              {activeSpeaker === userId && <p>Your turn!</p>}
              {activeSpeaker !== userId && (
                <>
                  <Person
                    person={participants.find((p) => p.uid === activeSpeaker)}
                  />
                  <p>'s turn</p>
                </>
              )}
            </SpeakerBox>
          )}
          {mode == "GROUP" && updateRanking && (
            <Ranking
              updateRanking={updateRanking}
              ranking={ranking || []}
              participants={participants}
            />
          )}
          {console.log("The mode is", mode, mode === "ONE_ON_ONE")}
          {mode === "ONE_ON_ONE" && like && (
            <Like
              like={like as any}
              partner={
                participants.find(
                  (p) => p.currentRoomId === room.id && p.uid !== userId
                ) as Participant
              }
              likes={participants.find((p) => p.uid === userId)?.likes}
            />
          )}
        </Sidebar>
      </Wrapper>
      {popup && (
        <Popup>
          {popup}
          {timer && (
            <TimerBox>
              <p>Starting in </p>
              <Timer until={timer} />
            </TimerBox>
          )}
        </Popup>
      )}
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

  p {
    margin: 0;
  }
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
  box-shadow: ${shadow};
  border-radius: 4px;
  padding: 100px;
  display: grid;
  justify-content: center;
  justify-items: center;
  align-items: center;
  align-content: center;
  font-size: 16px;
`;

const TimerBox = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin-top: 20px;
  p {
    font-size: 20px;
  }
`;

const SpeakerBox = styled.div<{ important?: boolean }>`
  padding: 20px;
  display: grid;
  grid-auto-flow: column;
  justify-content: start;
  align-items: center;
  p {
    font-size: 20px;
    ${(p) => p.important && "font-weight: 700;"}
  }
  border: 5px solid ${(p) => (p.important ? colors.warning : colors.white)};
`;

export default VideoRoom;
