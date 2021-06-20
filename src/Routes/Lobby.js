import React from "react";
import styled from "styled-components";


function Lobby() {
  return (
    <StyledLobbyWrapper>
      <LobbyMenu />
    </StyledLobbyWrapper>
  );
}

const StyledLobbyWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #e04242;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Lobby;
