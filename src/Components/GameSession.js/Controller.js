import React, { useContext, useEffect, useState } from "react";
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
  const socket = useContext(SocketContext);
  const [drawable, setDrawable] = useState(firstTurn);
  const [winable, setWinable] = useState(false);
  const [faceoffIds, setFaceoffIds] = useState();

  const draw = () => {
    console.log(drawable);
    if (drawable) {
      socket.emit("draw", code, (response) => {
        console.log(response, "did this happen");
        setDrawable(false);
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

//   useEffect(() => {
//     // socket.on(`player_draw`, (response) => {
//     //   console.log("what", response.nextToDraw, playerId);
//     //   if (response.nextToDraw == playerId) {
//     //     setDrawable(true);
//     //   }
//     // });
//     // socket.on(`faceoff_challenged`, (response) => {
//     //   setDrawable(false);
//     //   if (response.playersInvolved.includes(playerId)) {
//     //     setWinable(true);
//     //     setFaceoffIds(response.playersInvolved);
//     //   }
//     // });

//     // socket.on(`faceoff_resolved`, (response) => {
//     //   setWinable(false);
//     //   console.log("i ran to resolve");
//     //   if (response.nextToDraw == playerId) {
//     //     console.log("draw it pls?");
//     //     setDrawable(true);
//     //   }
//     // });

//     return () => {
//       //  socket.off(`player_draw`);
//       socket.off(`faceoff_challenged`);
//       socket.off(`faceoff_resolved`);
//     };
//   }, [playerId]);

  useEffect(() => {
    console.log(drawable);
  });

  return (
    <StyledButtonsContainer>
      {
        <button disabled={!drawable} onClick={draw} className="draw-btn">
          Draw Card
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
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    :hover {
      box-shadow: 0 0px 0px rgba(0, 0, 0, 0.16), 0 0px 0px rgba(0, 0, 0, 0.23);
    }
  }

  .draw-btn {
    background-color: green;
    color: white;
  }
`;

export default Controller;
