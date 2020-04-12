import * as React from "react";

interface Props {
  participants: any[];
}

const WaitingRoom: React.FC<Props> = ({ participants }) => (
  <div>Your're waiting with {participants.map((p) => p.name + " ")}</div>
);

export default WaitingRoom;
