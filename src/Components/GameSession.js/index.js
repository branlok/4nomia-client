import React, { useContext, useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled, { keyframes, css } from "styled-components";
import SocketContext from "../../Context/socket";
import Controller from "./Controller";
import Hand from "./Hand";
import OverlayPrompt from "./OverlayPrompt";
import TurnIndicator from "./TurnIndicator";
import WildCard from "./WildCard";
import YourTurnIndicator from "./YourTurnIndicator.js";
import { ReactComponent as ArrowSvg } from "../../Styles/svg/up-arrow-svgrepo-com (6).svg";
import ScoreBoard from "./ScoreBoard";
function GameSession() {
  const { state } = useLocation();
  const socket = useContext(SocketContext);
  const [playerDraw, setPlayerDraw] = useState();
  const [faceoffListener, setFaceoffListener] = useState();
  const [wildCardListener, setWildCardListener] = useState();
  const [faceoffResolvedListener, setFaceoffResolvedListener] = useState();
  const [endGame, setEndGame] = useState(false);
  useEffect(() => {
    socket.on(`player_draw`, (response) => {
      // console.log(response);
      setPlayerDraw(response);
    });
    socket.on(`faceoff_challenged`, (response) => {
      setFaceoffListener(response);
      //   console.log(response);
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
    socket.on("roomAnnouncement", (response) => {
      //   console.log(response);
      setEndGame(response);
    });

    return () => {
      socket.off(`player_draw`);
      socket.off(`faceoff_challenged`);
      socket.off(`wildCard`);
      socket.off("faceoff_resolved");
      socket.off("roomAnnouncement");
    };
  });

  let turn = playerDraw
    ? playerDraw?.nextToDraw == socket.id
    : state.init.playerPositions[0][0] == socket.id;

  return (
    <>
      <OverlayPrompt
        endGame={endGame}
        playerPositions={state.init.playerPositions}
        firstTurn={state.init.playerPositions[0][0] == socket.id}
        firstPlayerName={state.init.playerPositions[state.init.playerTurn][1]}
      />
      <LeftDivision>
        <h1>WILD CARD</h1>
        <WildCard wildCardListener={wildCardListener} />
        <ScoreBoard faceoffResolvedListener={faceoffResolvedListener} />
      </LeftDivision>
      <RightDivision>
        <StyOpponentQuadrant turn={!turn}>
          {Object.keys(state.roomState.currentMembers).map((item, index) => {
            if (item !== socket.id) {
              return (
                <div className="player" key={item}>
                  <div className="arrow">
                    <ArrowSvg className="arrowSvg" />
                  </div>
                  <div className="main">
                    <Hand
                      faceoffResolvedListener={faceoffResolvedListener}
                      faceoffListener={faceoffListener}
                      playerId={item}
                      playerDraw={playerDraw}
                    />
                    <TurnIndicator
                      playerDraw={playerDraw}
                      playerId={item}
                      firstTurn={state.init.playerPositions[0][0] == item}
                      playerName={state.roomState.currentMembers[item]}
                    />
                  </div>
                </div>
              );
            } else {
              return (
                <div className="player" key={item}>
                  {index !== 0 && (
                    <div className="arrow">
                      <ArrowSvg className="arrowSvg" />
                    </div>
                  )}
                  <div className="you">YOU</div>
                </div>
              );
            }
          })}
        </StyOpponentQuadrant>
        <StyYourQuadrant turn={turn}>
          <Hand
            // playerHands={playerHands}
            faceoffResolvedListener={faceoffResolvedListener}
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
          <div className="nameTag">
            <div className="name">
              {state.roomState.currentMembers[socket.id]}
            </div>
          </div>
        </StyYourQuadrant>
      </RightDivision>
    </>
  );
}

const pulse = keyframes`
    0% {
        background-color: rgba(0,0,0,0);
    }
    100% {
        background-color: rgba(0,0,0,0.15);
    }
    /* 100% {
        background-color: rgba(0,0,0,0);
    } */
`;

const LeftDivision = styled.div`
  width: 400px;
  height: 100%;
  border-right: 5px solid #ff2119;
  /* background-color: rgba(255, 255, 255, 0.1); */
  /* background-color: #ff2119; */
  background-color: #643e46;
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
  background-color: rgba(255, 255, 255, 0.05);
  /* background-color: #bb0606; */
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%235c1405' fill-opacity='0.61' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E");

  /* background-color: rgba(255, 255, 255, 0.05);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23c23838' fill-opacity='0.48' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E"); */
`;
const StyOpponentQuadrant = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  border-bottom: 5px solid #ff2119;
  /* background-color: ${(props) =>
    props.turn ? " rgba(150,150,150,0.15)" : " rgba(0,0,0,0)"}; */
  animation: ${(props) =>
    props.turn
      ? css`
          ${pulse} 1s ease infinite alternate;
        `
      : css``};
  /* background-color: rgba(0, 0, 0, 0.15);
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23ff4d4d' fill-opacity='.8' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E"); */
  .player {
    display: flex;
    .main {
    }
    .you {
      /* border: 2px solid black; */
      transition: 0.3s;
      background-color: ${(props) =>
        props.turn ? " rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)"};
      border-radius: 50%;
      height: 75px;
      width: 75px;
      display: flex;
      justify-content: center;
      font-weight: bold;
      align-items: center;
      margin-bottom: 50px;
      color: white;
    }
    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 50px;
      margin: 0px 10px;
      .arrowSvg {
        width: 20px;
        height: 20px;
        margin-bottom: 50px;
        fill: black;
        opacity: 0.5;
        transform: rotate(90deg);
      }
    }
  }
`;

const StyYourQuadrant = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50%;
  width: 100%;
  padding: 20px;
  position: relative;
  transition: 0.3s;
  animation: ${(props) =>
    props.turn
      ? css`
          ${pulse} 1s ease infinite alternate;
        `
      : css``};
  /* background-color: ${(props) =>
    props.turn ? " rgba(0,0,0,0.10)" : " rgba(0,0,0,0)"}; */
  .nameTag {
    .name {
      text-align: center;
      width: 100%;
      transition: 0.3s;
      padding: 10px;
      border-radius: 10px;
      backdrop-filter: blur(5px);
      /* color: white; */
      color: ${(props) => (props.turn ? "black" : "white")};
      background-color: ${(props) =>
        props.turn ? "rgba(255, 255, 255, 0.6)" : "rgba(0, 0, 0, 0.6);"};
      box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    }
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    justify-content: center;
    display: flex;
    padding: 10px;
  }
  /* background-color: rgba(255, 255, 255, 0.05);
  /* background-color: #bb0606; */
  /* background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120' viewBox='0 0 120 120'%3E%3Cpolygon fill='%235c1405' fill-opacity='0.61' points='120 0 120 60 90 30 60 0 0 0 0 0 60 60 0 120 60 120 90 90 120 60 120 0'/%3E%3C/svg%3E"); */
  */ .controller {
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
