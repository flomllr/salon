import * as React from "react";
import styled from "styled-components";
import { colors } from "../theme";

export default styled.div<{ background: string }>`
  background-color: ${(p) => p.background || colors.warning};
`;
