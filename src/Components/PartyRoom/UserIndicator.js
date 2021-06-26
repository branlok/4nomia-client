import { useSpring, animated, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CircleSvg } from "../../Styles/svg/presence-busy-16-filled-svgrepo-com.svg";
import { ReactComponent as SquareSvg } from "../../Styles/svg/stop-svgrepo-com.svg";
import { ReactComponent as StarSvg } from "../../Styles/svg/star-svgrepo-com (3).svg";
import { ReactComponent as DonutSvg } from "../../Styles/svg/record-svgrepo-com.svg";

import { ReactComponent as HashSvg } from "../../Styles/svg/hash-svgrepo-com.svg";
import { ReactComponent as ZigZagSvg } from "../../Styles/svg/zigzag-hieroglyph-svgrepo-com.svg";
import { ReactComponent as PauseSvg } from "../../Styles/svg/pause-two-lines-svgrepo-com.svg";
import { ReactComponent as PlusSvg } from "../../Styles/svg/plus-svgrepo-com (1).svg";

function UserIndicator({ roomState }) {
  if (roomState.currentMembers) {
    return (
      <StyledIndicator>
        {Object.keys(roomState.currentMembers).map((item, index) => {
          return (
            <Icon
              ready={roomState[item].ready}
              key={item}
              name={roomState[item].username}
              index={index}
            />
          );
        })}
      </StyledIndicator>
    );
  } else {
    return null;
  }
}

function Icon({ ready, name, index }) {
  let colors = ["red", "orange", "indigo", "yellow", "brown", "purple"];

  let props = useSpring({
    from: { opacity: 0, translateY: "-20px" },
    to: {
      opacity: 1,
      translateY: "0px",
      scale: ready ? "1" : "0.5",
      rotate: ready ? "0deg" : "80deg",
      filter: ready ? "saturate(1)" : "saturate(0)",
      fill: ready ? colors[index] : "gray",
    },
    config: config.default,
  });

  let SVGS = [
    <HashSvg className="svg red" />,
    <SquareSvg className="svg orange" />,
    <StarSvg className="svg indigo" />,
    <DonutSvg className="svg yellow" />,
    <CircleSvg className="svg brown" />,
    <PauseSvg className="svg purple" />,
  ];

  return (
    <StyledIcon ready={ready} style={{ ...props }}>
      {SVGS[index]}
      {/* <div className="name">{name}</div> */}
    </StyledIcon>
  );
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
  /* border-radius: 50%; */
  //background-color: ${(props) => (props.ready ? "black" : "gray")};
  /* transform: ${(props) => (props.ready ? "scale(1)" : "scale(0.7)")}; */
  /* border: 1px solid black; */
  /* margin-left: -10px; */
  /* margin-right: 5px; */
  transform-origin: center;
  /* transition: 0.3s; */
  position: relative;
  margin: 0px 2px;
  &:hover > .name {
    opacity: 1;
  }
  .svg {
    height: 25px;
    width: 25px;
  }
  /* .red {
    fill: red;
  }
  .orange {
    fill: orange;
  }
  .indigo {
    fill: indigo;
  }
  .yellow {
    fill: yellow;
  }
  .brown {
    fill: brown;
  }
  .purple {
    fill: purple;
  }
  .green {
    fill: green;
  } */
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
