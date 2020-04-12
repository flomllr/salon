import * as React from "react";
import { useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import styled from "styled-components";

const dailyUrl = "https://magicsalon.daily.co/";

interface Props {
  roomId?: string | number;
  registerCallFrame: (frame: any) => any;
}

const Daily: React.FunctionComponent<Props> = ({
  roomId,
  registerCallFrame,
}) => {
  useEffect(() => {
    const frame = document.getElementById("frame");
    const callFrame = DailyIframe.wrap(frame);
    callFrame.join({ url: dailyUrl + roomId });
    console.log("callFrame old url", callFrame._iframe.src);
    const buggyUrl = callFrame._iframe.src;
    const cleanUrl = buggyUrl.split("?")[0];
    callFrame._iframe.src = cleanUrl;
    console.log("callFrame new url", callFrame._iframe.src);
    registerCallFrame(callFrame);
  }, [roomId]);

  return <DailyFrame id="frame" allow="microphone; camera; autoplay" />;
};

const DailyFrame = styled.iframe`
  border: none;
  height: 100%;
  width: 100%;
`;

export default Daily;
