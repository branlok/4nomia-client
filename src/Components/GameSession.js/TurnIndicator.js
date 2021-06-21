import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SocketContext from "../../Context/socket";

function TurnIndicator({
  playerDraw,
  playerId,
  firstTurn,
  playerName,
}) {
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
      <div className="name">{playerName}</div>
      <div className="circle" />
    </StyledIndicator>
  );
}


const StyledIndicator = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  margin: 20px 10px;
  transition: 0.3s;
  background: ${(props) =>
    props.turn ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)"};
  padding: 10px;
  border-radius: 10px;

  .name {
    position: relative;
    font-weight: bold;
    color: white;
    line-height: 20px;
    font-size: 16px;
  }
  .circle {
    height: 15px;
    width: 15px;
    border-radius: 50%;
    background-color: ${(props) => (props.turn ? "lime" : "gray ")};
    margin-left: 10px;
    box-shadow: ${(props) =>
      props.turn ? "0px 0px 5px 2px #6effaf" : "0px 0px 0px 0px "};
  }
`;

export default TurnIndicator;
