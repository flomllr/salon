import * as React from "react";
import styled from "styled-components";

export default styled.div<{ height: number }>`
  height: ${(p) => p.height || 0}px;
`;
