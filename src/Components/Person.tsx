import * as React from "react";
import { Participant } from "../types";
import styled from "styled-components";

interface Props {
  person?: Participant;
}

const Person: React.FC<Props> = ({ person }) => {
  const { name, profilePicture } = person || {};
  return (
    <Wrapper>
      {profilePicture && <img src={profilePicture} />}
      {name}
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Person;
