import { useSpring, animated, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function UserIndicator({ roomState }) {

  if (roomState.currentMembers) {
    return (
      <StyledIndicator>
        {Object.keys(roomState.currentMembers).map((item, index) => {
          return (
              <Icon ready={roomState[item].ready} key={item} name={roomState[item].username}/>
            // <StyledIcon ready={roomState[item].ready} key={item}>
            //   <div className="name">{roomState[item].username}</div>
            // </StyledIcon>
          );
        })}
      </StyledIndicator>
    );
  } else {
    return null;
  }
}

function Icon({ready, name}) {
    let props = useSpring({ to: { backgroundColor: ready ? 'black' : 'gray' }, config: config.default})
    return (
        <StyledIcon ready={ready} style={props}>
            <div className="name">{name}</div>
        </StyledIcon>
    )
}

const StyledIndicator = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  margin: 10px;
  display: flex;
`;

const StyledIcon = styled(animated.div)`
  height: 25px;
  width: 25px;
  border-radius: 50%;
  //background-color: ${(props) => (props.ready ? "black" : "gray")};
  transform: ${(props) => (props.ready ? "scale(1)" : "scale(0.7)")}; 
  /* margin-left: -10px; */
  margin-right: 5px;
  transition: 0.3s;
  position: relative;
  &:hover > .name {
    opacity: 1;
  }
  .name {
    opacity: 0;
    position: absolute;
    top: -20px;
    display: flex;
    justify-content: center;
    text-align: center;
    align-items: center;
    border-radius: 5px;
    width: 100%;
    transition: 0.3s;
    font-weight: bold;
  }
  :first-child {
    /* margin-left: 0px; */
  }
`;



export default UserIndicator;
