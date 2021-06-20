import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SocketContext from "../../Context/socket";

function TurnIndicator({ playerDraw, playerId, firstTurn, playerName }) {
  const [playerTurn, setPlayerTurn] = useState(firstTurn);


  useEffect(() => {
    if (playerDraw) {
      if (playerId == playerDraw.nextToDraw) {
        setPlayerTurn(true);
      } else {
        setPlayerTurn(false);
      }
    }
  }, [playerDraw]);

  return (
    <StyledIndicator turn={playerTurn}>
      <div className="message">{playerName}</div>
      <div className="circle" />
    </StyledIndicator>
  );
}

const StyledIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 10px 10px;
  .message {
    position: relative;
    font-weight: bold;
    color: white;
    line-height: 20px;
  }
  .circle {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(props) => (props.turn ? "lime" : "gray ")};
    margin-left: 10px;
  }
`;

export default TurnIndicator;
