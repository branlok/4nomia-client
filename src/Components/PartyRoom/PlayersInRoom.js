import {
  config,
  useSpring,
  animated,
  useSprings,
  useTransition,
} from "react-spring";
import React from "react";
import styled from "styled-components";
import DoorBell from "../../Sounds/doorbell.mp3";
import useSound from "use-sound"
function PlayersInRoom({ roomState }) {
  let members = Object.keys(roomState.currentMembers);
  let [doorbell] = useSound(DoorBell, {volume: 0.3});
  const transitions = useTransition(members, {
    from: {
      opacity: 0,
      translateY: 0,
      width: 0,
      margin: 0,
      padding: "0px 0px",
    },
    enter: {
      opacity: 1,
      translateY: 0,
      width: 150,
      margin: 5,
      padding: "5px 10px",
    },
    leave: {
      opacity: 0,
      translateY: 0,
      width: 0,
      margin: 0,
      padding: "0px 0px",
      border: "0px",
    },
    delay: 100,
    config: config.default,
    onStart: doorbell
  });

  return (
    <>
      <StyledPlayerList>
        {transitions((style, item) => (
          <SpringNameTag style={style}>
            {roomState[item].username}
          </SpringNameTag>
        ))}
      </StyledPlayerList>
    </>
  );
}

const StyledPlayerList = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: stretch;
  /* background-color: ghostwhite; */
  /* border-radius: 5px; */
  border-top: 5px solid #dbdbdb;
  margin-top: 10px;

  /* .name {
    color: white;
    background-color: black;
    border: 2px solid black;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    margin: 5px;
  } */
`;

const SpringNameTag = styled(animated.div)`
  color: white;
  background-color: black;
  border: 2px solid black;
  /* padding: 5px 10px; */
  font-size: 14px;
  font-weight: bold;
  border-radius: 5px;
  text-overflow: ellipsis;
`;

export default PlayersInRoom;
