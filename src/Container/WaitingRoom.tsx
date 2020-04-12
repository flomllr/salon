import React, { useState, useEffect } from "react";

import { Logo } from "src/Components/Logo";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useSound from "use-sound";

interface Props {
  participants: any[];
}

function getRndInteger(min : number, max : number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const messages = [
  "is ready too!",
  "can't wait to meet you",
  "wants to debate on P vs NP",
  "apparently likes dogs",
  "is really excited",
  "is ready",
  "is joining the call",
];

const WaitingRoom: React.FC<Props> = ({ participants }) => {
  const [numberOfParticipants, setNumberOfParticipants] = useState(participants.length);
  alert('yo')
  const [playJoin1] = useSound("/sounds/join.mp3", { volume: 0.6 });
  const [playJoin2] = useSound("/sounds/join2.mp3", { volume: 0.6 });
  useEffect(() => {
    if (participants.length !== numberOfParticipants) {
      setNumberOfParticipants(participants.length);
      const i = getRndInteger(0, 2);
      if (i === 0) {
        playJoin1({});
      } else {
        playJoin2({});
      }
    }
  }, [participants, numberOfParticipants, playJoin1, playJoin2]);
  const items = participants.map((p, i) => (
    <CSSTransition key={p.name + p.profilePicture} timeout={500} classNames="item">
      <div
        key={p.name}
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <img style={{ borderRadius: "50%" }} src={p.profilePicture} width={50} />
        <label style={{ marginLeft: 10, fontSize: "1.1em" }}>
          {p.name} {messages[i]}
        </label>
      </div>
    </CSSTransition>
  ));
  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Logo>Salon</Logo>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <h3>You are in the waiting room</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", flexDirection: "column", marginTop: 10 }}>
          <TransitionGroup>{items}</TransitionGroup>
        </div>
      </div>
    </div>
  );
};

export default WaitingRoom;
