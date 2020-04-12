import * as React from "react";
import { Participant } from "../types";
import { shadow, colors } from "../theme";
import Person from "./Person";
import styled from "styled-components";
import { Button } from "./Button";

interface Props {
  like: () => any;
}

const Like: React.FC<Props> = ({ like }) => {
  return (
    <Wrapper>
      <Infobox>
        <Private>🔒 Private</Private>
        <h3>Like the talk?</h3>
        <Button onClick={like}>Yes</Button>
      </Infobox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 5px solid ${colors.lightgray};
`;
const Infobox = styled.div`
  padding: 20px;
`;

const Private = styled.h3`
  color: ${colors.gray};
`;
export default Like;
