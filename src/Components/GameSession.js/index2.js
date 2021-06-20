import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";
import SocketContext from "../../Context/socket";
import Controller from "./Controller";
import Hand from "./Hand";
import TurnIndicator from "./TurnIndicator";

function GameSession() {
  const { state } = useLocation();
  const socket = useContext(SocketContext);
  const [turn, setTurn] = useState(state.turns.playerTurn);
  const [faceoff, setFaceoff] = useState([]);
  const [playerTurn, setPlayerTurn] = useState(state.turns.playerTurn);

  const [card, setCard] = useState(null);
  const [turnInstructions, setTurnInstructions] = useState(state.turns);
  const [roomState, setRoomState] = useState(state.roomState);

  useEffect(() => {
    socket.on("roomAnnouncement", (response) => {
      if (response.action == "none") {
        setTurnInstructions(response);
        setTurn(response.lastPlayer);
        setPlayerTurn(response.playerTurn);
      } else if (response.action == "faceOff") {
          console.log(response)
        setFaceoff(response.playersInvolved)

      }
    });
    return () => socket.off("roomAnnouncement");
  });

  return (
    <>
      <LeftDivision>ye boi</LeftDivision>
      <RightDivision>
        <StyOpponentQuadrant>
          {Object.keys(roomState.currentMembers).map((item) => {
            if (item !== socket.id) {
              return (
                <div key={item}>
                  <Hand
                    identifier={item}
                    roomState={roomState}
                    turn={turn}
                    playerPositions={state.turns.playerPositions}
                    //   username={roomState.currentMembers[item]}
                    turnInstructions={turnInstructions}
                    opponent={true}
                    faceoff={faceoff}
                  />
                  <TurnIndicator
                    playerTurn={
                      state.turns.playerPositions[playerTurn][0] == item
                    }
                    playerName={state.turns.playerPositions[playerTurn][1]}
                  />
                </div>
              );
            }
          })}
        </StyOpponentQuadrant>
        <StyYourQuadrant>
          <div className="turnIndicator">
            {state.turns.playerPositions[playerTurn][0] === socket.id &&
              "your turn"}
          </div>
          <Hand
            key="bruh"
            id={socket.id}
            identifier={socket.id}
            roomState={roomState}
            turn={turn}
            playerPositions={state.turns.playerPositions}
            // username={roomState.currentMembers[socket.id]}
            turnInstructions={turnInstructions}
            opponent={false}
            faceoff={faceoff}
          />
          <Controller />
        </StyYourQuadrant>
      </RightDivision>
    </>
  );
}

const LeftDivision = styled.div`
  width: 400px;
  height: 100%;
  border-right: 5px solid #b8241f;
  flex: 0 1 auto;
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
`;

const StyYourQuadrant = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  padding: 20px;
  position: relative;
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
//user hand
//everyone elses' hand

export default GameSession;
