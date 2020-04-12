import * as React from 'react';
import { useEffect } from 'react';
import DailyIframe from '@daily-co/daily-js';
import ControlService from "../services/ControlService";
import styled from "styled-components";

interface Props {
}

const Daily: React.FunctionComponent<Props> = (props) => {
  useEffect(() => {
    const frame = document.getElementById("frame");
    const callFrame = DailyIframe.wrap(frame);
    ControlService.registerFrame(callFrame);
  }, [])

    
  return <DailyFrame id="frame" allow="microphone; camera; autoplay" />;
};

const DailyFrame = styled.iframe`
  border: none;
  height: 100vh;
  width: 100vw;
`;


export default Daily;
