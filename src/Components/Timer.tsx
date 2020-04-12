import React, { useState, useEffect } from "react";
import styled from "styled-components";

function fmtMSS(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

interface Props {
  until: number;
  large?: boolean;
}

const Timer: React.FunctionComponent<Props> = ({ until, large }) => {
  const [ogTime, setOgTime] = useState(until);
  const [timeLeft, setTimeLeft] = useState(until - new Date().getTime());
  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(until - new Date().getTime());
    }, 1000);
  });

  useEffect(() => {
    if (ogTime !== until) {
      setOgTime(until);
      setTimeLeft(until - new Date().getTime());
    }
  }, [ogTime]);
  return (
    <div>
      <Text large={large}>
        {timeLeft > 0 ? fmtMSS(Math.round(timeLeft / 1000)) : "Waiting..."}
      </Text>
    </div>
  );
};

const Text = styled.p<{ large?: boolean }>``;

export default Timer;
