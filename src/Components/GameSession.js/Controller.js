import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import SocketContext from "../../Context/socket";

function Controller({
  faceoffResolvedListener,
  faceoffListener,
  playerDraw,
  playerId,
  firstTurn,
}) {
  const { code } = useParams();
  const buttonRef = useRef();
  const socket = useContext(SocketContext);
  const [drawable, setDrawable] = useState(firstTurn);
  const [winable, setWinable] = useState(false);
  const [faceoffIds, setFaceoffIds] = useState();

  const draw = () => {
    if (drawable) {
      setDrawable(false);
      socket.emit("draw", code, (response) => {
        // setDrawable(false);
        if (response.command == "draw again") {
          setDrawable(true);
        }
        console.log(response, playerId, "draw callback");
      });
    }
  };

  const winCard = () => {
    if (winable) {
      socket.emit("winCard", code, faceoffIds, (response) => {
        console.log(response, "ey?");
      });
    }
  };

  useEffect(() => {
    if (playerDraw) {
      if (playerDraw.nextToDraw == playerId) {
        console.log("hello");
        setDrawable(true);
      }
    }
  }, [playerDraw]);

  useEffect(() => {
    if (faceoffListener) {
      setDrawable(false);
      if (faceoffListener.playersInvolved.includes(playerId)) {
        setWinable(true);
        setFaceoffIds(faceoffListener.playersInvolved);
      }
    }
  }, [faceoffListener]);

  useEffect(() => {
    if (faceoffResolvedListener) {
      setWinable(false);
      console.log("i ran to resolve");
      if (faceoffResolvedListener.nextToDraw == playerId) {
        console.log("draw it pls?");
        setDrawable(true);
      }
    }
  }, [faceoffResolvedListener]);

  let keyDown = (e) => {
    if (e.code == "Space" && !e.repeat) {
      buttonRef.current.click();
    }
  };

  useEffect(() => {
    if (drawable) {
      window.addEventListener("keyup", keyDown);
    }

    return () => window.removeEventListener("keyup", keyDown);
  }, [drawable]);

  return (
    <StyledButtonsContainer>
      {
        <button
          ref={buttonRef}
          disabled={!drawable}
          onClick={draw}
          className="draw-btn"
        >
          Draw Card <br />
          <span className="shortcut">(space bar)</span>
        </button>
      }
      {
        <button className="win-btn" onClick={winCard}>
          Win Face-off
        </button>
      }
    </StyledButtonsContainer>
  );
}

const StyledButtonsContainer = styled.div`
  margin-left: 80px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  button {
    margin: 10px 0px;
    border-style: none;
    padding: 10px;
    font-weight: bold;
    border-radius: 5px;
    font-size: 16px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.36), 0 3px 6px rgba(0, 0, 0, 0.23);
    transition: 0.2s;
    cursor: pointer;
    .shortcut {
      font-size: 12px;
      color: #b8b8b8;
    }
    :hover {
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0), 0 0px 0px rgba(0, 0, 0, 0);
    }
  }

  .draw-btn {
    background-color: ForestGreen;
    :hover {
      background-color: DarkGreen;
    }
    color: white;
    user-select: none;
  }
  .win-btn {
      background-color: white;
      :hover {
          background-color: black;
          color: white;
      }
  }
`;

export default Controller;
