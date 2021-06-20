import React from "react";
import styled from "styled-components";
import PartyRoom from "../Components/PartyRoom";

function Room() {
  return (
    <StyledRoomWrapper>
      <PartyRoom />
    </StyledRoomWrapper>
  );
}

const StyledRoomWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #D42020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Room;
