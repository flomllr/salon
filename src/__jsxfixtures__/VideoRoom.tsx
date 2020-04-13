import React from "react";
import VideoRoom from "../Container/VideoRoom";
import { Participant, Room } from "../types";

const ranking: string[] = ["asdf", "defg"];
const likes: string[] = ["asdf", "defg"];

const participants: Participant[] = [
  {
    uid: "asdf",
    gender: "MALE",
    name: "Florian",
    twitterHandle: "florianmllr",
    profilePicture:
      "https://pbs.twimg.com/profile_images/1156174459482574848/p9__rbpC_400x400.jpg",
    ranking,
    likes,
    currentRoomId: "hello",
    mutualMatches: [],
  },
  {
    uid: "defg",
    gender: "FEMALE",
    name: "Vivian",
    twitterHandle: "vivian",
    profilePicture:
      "https://pbs.twimg.com/profile_images/1156174459482574848/p9__rbpC_400x400.jpg",
    ranking,
    likes,
    currentRoomId: "hello",
    mutualMatches: [],
  },
];

const room: Room = {
  id: "hello",
  action: "Action",
  instruction: "Instruction",
  timer: new Date().getTime() + 30 * 1000,
  activeSpeaker: "",
  nextPartOfSequenceButtonText: "Next",
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
    mode="GROUP"
    like={updateRanking}
  />
);
