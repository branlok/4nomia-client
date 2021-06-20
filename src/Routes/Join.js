import React from "react";
import styled from "styled-components";
import JoinMenu from "../Components/JoinMenu/index.js"

function Join() {
  return (
    <StyledJoinWrapper>
        <JoinMenu/>
    </StyledJoinWrapper>
  );
}

const StyledJoinWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #D42020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Join;
