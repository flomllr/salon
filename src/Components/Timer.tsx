import React, { useState, useEffect } from "react";

function fmtMSS(s: number) {
  return (s - (s %= 60)) / 60 + (9 < s ? ":" : ":0") + s;
}

interface Props {
  until: number;
}

const Timer: React.FunctionComponent<Props> = ({ until }) => {
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
      <p>{fmtMSS(Math.round(timeLeft / 1000))}</p>
    </div>
  );
};

export default Timer;
