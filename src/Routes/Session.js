import React from "react";
import styled from "styled-components";
import GameSession from "../Components/GameSession.js";

function Session() {
  return (
    <StyledRoomWrapper>
      <GameSession />
    </StyledRoomWrapper>
  );
}

const StyledRoomWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #D42020;
  background: linear-gradient(225deg, #cf1931, #d4162f, #d8132c, #dd1029, #e20d27, #e60923, #ea0620, #ef041c, #f30117, #f70011, #fb0009, #ff0000);
  display: flex;
  justify-content: center;
  align-items: center;
  
`;

export default Session;
