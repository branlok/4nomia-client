import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import SocketContext from "../../Context/socket";

function TurnIndicator({
  faceoffResolvedListener,
  faceoffListener,
  playerDraw,
  playerId,
  firstTurn,
  playerName,
}) {
  const [playerTurn, setPlayerTurn] = useState(firstTurn);
  const [faceoff, setFaceoff] = useState(false);

  useEffect(() => {
    if (playerDraw) {
      if (playerId == playerDraw.nextToDraw) {
        setPlayerTurn(true);
      } else {
        setPlayerTurn(false);
      }
    }
  }, [playerDraw]);

  useEffect(() => {
    if (faceoffListener) {
    //   console.log(faceoffListener.playersInvolved, playerId);
      if (faceoffListener.playersInvolved.includes(playerId)) {
        setFaceoff("you");
      } else {
        setFaceoff("others");
      }
    }
  }, [faceoffListener]);

  useEffect(() => {
      if (faceoffResolvedListener) {
          setFaceoff(false);
      }
  }, [faceoffResolvedListener])

  if (faceoff == "you") {
    return (
      <div className="turnIndicator">
        <div className="message">FACE OFF!</div>
        <div className="circle" />
      </div>
    );
  } else if (playerTurn && faceoff == "others") {
    return (
      <div className="turnIndicator">
        <div className="message">Wait for faceoff to complete</div>
        <div className="circle" />
      </div>
    );
  } else if (playerTurn) {
    return (
      <div className="turnIndicator">
        <div className="message">Your turn</div>
        <div className="circle" />
      </div>
    );
  } else {
    return (
      <div className="turnIndicator">
        <div className="message">Wait</div>
        <div className="circle" />
      </div>
    );
  }
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
