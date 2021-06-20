import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import SocketContext from "../../Context/socket";
import Controller from "./Controller";
import Hand from "./Hand";
import TurnIndicator from "./TurnIndicator";
import WildCard from "./WildCard";
import YourTurnIndicator from "./YourTurnIndicator.js";
function GameSession() {
  const { state } = useLocation();
  const socket = useContext(SocketContext);
  const [playerDraw, setPlayerDraw] = useState();
  const [faceoffListener, setFaceoffListener] = useState();
  const [wildCardListener, setWildCardListener] = useState();
  const [faceoffResolvedListener, setFaceoffResolvedListener] = useState();
  useEffect(() => {
    socket.on(`player_draw`, (response) => {
      setPlayerDraw(response);
    });
    socket.on(`faceoff_challenged`, (response) => {
      setFaceoffListener(response);
      console.log(response);
      // if (response.playersInvolved.includes(playerId)) {
      //   console.log(playerId, "challenged");
      //   setFaceoff(true);
      // }
    });
    socket.on("wildCard", (response) => {
      setWildCardListener(response);
    });

    socket.on(`faceoff_resolved`, (response) => {
      setFaceoffResolvedListener(response);
      // setWinable(false);
      // console.log("i ran to resolve")
      // if (response.nextToDraw == playerId) {
      //   console.log("draw it pls?");
      //   setDrawable(true);
      // }
    });

    return () => {
      socket.off(`player_draw`);
      socket.off(`faceoff_challenged`);
      socket.off(`wildCard`);
      socket.off('faceoff_resolved');
    };
  });

  return (
    <>
      <LeftDivision>
        <h1>WILD CARD</h1>
        <WildCard wildCardListener={wildCardListener} />
      </LeftDivision>
      <RightDivision>
        <StyOpponentQuadrant>
          {Object.keys(state.roomState.currentMembers).map((item, index) => {
            if (item !== socket.id) {
              return (
                <div key={item}>
                  <Hand
                    faceoffListener={faceoffListener}
                    playerId={item}
                    playerDraw={playerDraw}
                  />
                  <TurnIndicator
                    playerDraw={playerDraw}
                    playerId={item}
                    firstTurn={state.init.playerPositions[0][0] == item}
                    playerName={state.roomState.currentMembers[socket.id]}
                  />
                </div>
              );
            }
          })}
        </StyOpponentQuadrant>
        <StyYourQuadrant>
          <Hand
            // playerHands={playerHands}
            faceoffListener={faceoffListener}
            playerDraw={playerDraw}
            playerId={socket.id}
          />
          <Controller
            faceoffResolvedListener={faceoffResolvedListener}
            playerDraw={playerDraw}
            faceoffListener={faceoffListener}
            playerId={socket.id}
            firstTurn={state.init.playerPositions[0][0] == socket.id}
          />
          <YourTurnIndicator
            playerDraw={playerDraw}
            faceoffListener={faceoffListener}
            faceoffResolvedListener={faceoffResolvedListener}
            playerId={socket.id}
            firstTurn={state.init.playerPositions[0][0] == socket.id}
            playerName={state.roomState.currentMembers[socket.id]}
          />
        </StyYourQuadrant>
      </RightDivision>
    </>
  );
}

const LeftDivision = styled.div`
  width: 400px;
  height: 100%;
  border-right: 5px solid #b8241f;
  background-color: rgba(255, 255, 255, 0.1);
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    margin-bottom: 20px;
    font-size: 20px;
    color: white;
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
`;

const RightDivision = styled.div`
  width: 100%;
  height: 100%;
`;

const StyOpponentQuadrant = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  border-bottom: 5px solid #b8241f;
  background-color: ${(props) =>
    props.turn ? " rgba(0,0,0,0.2)" : " rgba(0,0,0,0)"};
`;

const StyYourQuadrant = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  padding: 20px;
  position: relative;
  transition: 1s;
  background-color: ${(props) =>
    props.turn ? " rgba(0,0,0,0.2)" : " rgba(0,0,0,0)"};
  .controller {
    width: 100px;
    height: 300px;
  }
  .turnIndicator {
    position: absolute;
    top: 10px;
    right: 10px;
    padding: 10px;
    border-radius: 5px;
    background-color: white;
    font-weight: bold;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  }
`;

export default GameSession;
