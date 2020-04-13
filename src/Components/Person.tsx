import * as React from "react";
import { Participant } from "../types";
import styled from "styled-components";

interface Props {
  person?: Participant;
  index?: number;
}

const Person: React.FC<Props> = ({ person, index }) => {
  const { name, profilePicture } = person || {};
  return (
    <Wrapper>
      {index !== undefined && <Name>{index + 1}) </Name>}
      {profilePicture && <Image src={profilePicture} />}
      <Name>{name}</Name>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: grid;
  align-items: center;
  grid-auto-flow: column;
  justify-content: start;
  grid-gap: 20px;
  align-content: center;
`;

const Image = styled.img`
  width: 50px;
  height: auto;
  border-radius: 100px;
`;

const Name = styled.p`
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

export default Person;
