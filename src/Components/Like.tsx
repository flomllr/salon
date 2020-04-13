import * as React from "react";
import { Participant } from "../types";
import { shadow, colors } from "../theme";
import Person from "./Person";
import styled from "styled-components";
import { Button } from "./Button";

interface Props {
  like: (uid: string) => any;
  partner: Participant;
  likes?: string[];
}

const Like: React.FC<Props> = ({ like, partner, likes }) => {
  return (
    <Wrapper>
      <Infobox>
        <Private>🔒 Private</Private>
        {likes && likes.includes(partner.uid) ? (
          <h3>Awesome!</h3>
        ) : (
          <>
            <h3>Like {partner.gender === "FEMALE" ? "her" : "him"}?</h3>
            <Button onClick={() => like(partner.uid)}>I do!</Button>
          </>
        )}
      </Infobox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  border: 5px solid ${colors.lightgray};
`;
const Infobox = styled.div`
  text-align: center;
  padding: 20px;
`;

const Private = styled.h3`
  color: ${colors.gray};
`;
export default Like;
