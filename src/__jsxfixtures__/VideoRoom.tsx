import React from "react";
import VideoRoom from "../Container/VideoRoom";
import { Participant, Room } from "../types";

const ranking: string[] = ["asdf", "defg"];
const likes: string[] = ["asdf"];

const participants: Participant[] = [
  {
    uid: "asdf",
    gender: "MALE",
    name: "Florian",
    twitterHandle: "florianmllr",
    profilePicture: "",
    ranking,
    likes,
    currentRoomId: "hello",
  },
  {
    uid: "defg",
    gender: "FEMALE",
    name: "Vivian",
    twitterHandle: "vivian",
    profilePicture: "",
    ranking,
    likes,
    currentRoomId: "hello",
  },
];

const room: Room = {
  id: "hello",
  action: "Action",
  instruction: "Instruction",
  timer: new Date().getTime() + 30 * 1000,
  activeSpeaker: undefined,
  nextPartOfSequenceButtonText: "Next",
  popup: undefined,
};

const updateRanking = (ranking: any) => {
  console.log(ranking);
};

const nextPartOfSequence = () => {
  console.log("Next part of sequence");
};

export default (
  <VideoRoom
    participants={participants}
    registerCallFrame={() => {}}
    room={room}
    userId={"asdf"}
    updateRanking={updateRanking}
    onNextPartOfSequence={nextPartOfSequence}
  />
);
