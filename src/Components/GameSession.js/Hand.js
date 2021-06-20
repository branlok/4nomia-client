import React, { useContext } from "react";
import basicDeck from "../../Cards";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { useLocation } from "react-router";
import SocketContext from "../../Context/socket";
import { ReactComponent as CircleSvg } from "../../Styles/svg/presence-busy-16-filled-svgrepo-com.svg";
import { ReactComponent as SquareSvg } from "../../Styles/svg/stop-svgrepo-com.svg";
import { ReactComponent as StarSvg } from "../../Styles/svg/star-svgrepo-com (3).svg";
import { ReactComponent as DonutSvg } from "../../Styles/svg/record-svgrepo-com.svg";
export default function Hand({ faceoffListener, playerDraw, playerId }) {
  const { state } = useLocation();
  const socket = useContext(SocketContext);
  const [items, setItems] = useState([]);
  const [faceoff, setFaceoff] = useState(false);

  useEffect(() => {
    if (playerDraw) {
      if (playerDraw.playerId == playerId) {
        setItems((prevState) => [
          ...prevState,
          {
            socket: playerId,
            id: playerDraw.card,
            ...basicDeck[playerDraw.card],
            deg: (Math.random() - 0.5) * 20,
            translateX: (Math.random() - 0.5) * 10,
            translateY: (Math.random() - 0.5) * 10,
          },
        ]);
      }
    }
  }, [playerDraw]);

  useEffect(() => {
    if (faceoffListener) {
      if (faceoffListener.playersInvolved.includes(playerId)) {
        console.log(playerId, "challenged");
        setFaceoff(true);
      }
    }
  }, [faceoffListener]);

  useEffect(() => {
    // socket.on(`player_draw`, (response) => {
    //   if (response.playerId == playerId) {
    //     console.log("i ran");
    //     setItems((prevState) => [
    //       ...prevState,
    //       {
    //         socket: playerId,
    //         id: response.card,
    //         ...basicDeck[response.card],
    //         deg: (Math.random() - 0.5) * 20,
    //         translateX: (Math.random() - 0.5) * 10,
    //         translateY: (Math.random() - 0.5) * 10,
    //       },
    //     ]);
    //   }
    // });

    // socket.on(`faceoff_challenged`, (response) => {
    //   if (response.playersInvolved.includes(playerId)) {
    //     console.log(playerId, "challenged");
    //     setFaceoff(true);
    //   }
    // });

    socket.on(`faceoff_resolved_${playerId}`, (response) => {
      setFaceoff(false);
      setItems((prevState) => {
        let newArray = [...prevState];
        newArray.pop();
        return newArray;
      });
      if (response.victor == playerId) {
        console.log("you won");
      }
    });

    return () => {
      //   socket.off(`player_draw`);
      //socket.off(`faceoff_challenged`);
      socket.off(`faceoff_resolved_${playerId}`);
    };
  });

  const transitions = useTransition(items, {
    from: { opacity: 0, scale: 1.4, rotateX: 40 },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    enter: { opacity: 1, scale: 1, rotateX: 0 },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    leave: { opacity: 0, scale: 1.05, rotateX: 0 },
    config: config.stiff,
  });

  return (
    <StyledQuadrant>
      {transitions((styles, item) => {
        return (
          <StyledCard
            faceOff={faceoff}
            style={{
              ...styles,
              transform: `rotate(${item.deg}deg) translateX(${item.translateX}px)`,
            }}
          >
            <p>{item.type}</p>
            {item.match[0] == "circle" && <CircleSvg className="svg" />}
            {item.match[0] == "square" && <SquareSvg className="svg" />}
            {item.match[0] == "star" && <StarSvg className="svg" />}
            {item.match[0] == "donut" && <DonutSvg className="svg" />}
            <p>{item.value}</p>
          </StyledCard>
        );
      })}
      {/* {!opponent && <button onClick={draw}>Draw Card</button>} */}
    </StyledQuadrant>
  );
}
const StyledQuadrant = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 15px;
  height: 210px;
  width: 140px;
  position: relative;
  margin: 0px 20px;
`;

const StyledCard = styled(animated.div)`
  position: absolute;
  /* top: 100px;
  left: 100px; */
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  transform-origin: center;
  background-color: white;
  background: radial-gradient(circle at 50% 50%, #ffffff, #f7f7f7, #f0f0f0);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 210px;
  width: 140px;
  border: ${(props) => (props.faceOff ? "3px solid #6abf63" : "3px solid black")};
  border-radius: 5px;

  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  p {
    font-weight: bold;
    :nth-child(1) {
      transform: rotateX(180deg) rotateY(180deg);
    }
  }
  .svg {
    height: 50px;
    margin: 10px 0px;
    fill: #212121;
  }
`;
