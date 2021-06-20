import React, { useContext } from "react";
import basicDeck from "../../Cards";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTransition, animated, config } from "react-spring";
import SocketContext from "../../Context/socket";
import { useParams } from "react-router";

export default function Hand({
  turnInstructions,
  identifier,
  opponent,
  turn,
  playerPositions,
  faceoff,
}) {
  const [items, setItems] = useState([
    // {
    //   message: "cards1",
    //   deg: Math.random() * 20,
    //   translateX: (Math.random() - 0.5) * 10,
    //   translateY: (Math.random() - 0.5) * 10,
    // },
  ]);

  useEffect(() => {
    //only change for cooresponding player
    console.log(turnInstructions.action,"c")
    if (
      (turnInstructions.action == "none" || turnInstructions.action == "faceoff") &&
      identifier == playerPositions[turn][0]
    ) {
      setItems((prevState) => [
        ...prevState,
        {
          socket: identifier,
          id: turnInstructions.revealed,
          ...basicDeck[turnInstructions.revealed],
          deg: (Math.random() - 0.5) * 20,
          translateX: (Math.random() - 0.5) * 10,
          translateY: (Math.random() - 0.5) * 10,
        },
      ]);
    }
  }, [turn, faceoff]);

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
            faceOff={faceoff.includes(identifier)}
            style={{
              ...styles,
              transform: `rotate(${item.deg}deg) translateX(${item.translateX}px)`,
            }}
          >
            <p>{item.type}</p>
            <p>{item.match[0]}</p>
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
  justify-content: center;
  align-items: center;
  transform-origin: center;
  background-color: white;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 210px;
  width: 140px;
  border:  ${props => props.faceOff ? "3px solid green" : "3px solid black"};
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
`;
