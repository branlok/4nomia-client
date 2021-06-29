import { animated, useTransition, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { ReactComponent as CircleSvg } from "../../Styles/svg/presence-busy-16-filled-svgrepo-com.svg";
import { ReactComponent as SquareSvg } from "../../Styles/svg/stop-svgrepo-com.svg";
import { ReactComponent as StarSvg } from "../../Styles/svg/star-svgrepo-com (3).svg";
import { ReactComponent as DonutSvg } from "../../Styles/svg/record-svgrepo-com.svg";
import { ReactComponent as HashSvg } from '../../Styles/svg/hash-svgrepo-com.svg';
import { ReactComponent as ZigZagSvg } from '../../Styles/svg/zigzag-hieroglyph-svgrepo-com.svg';
import { ReactComponent as PauseSvg } from '../../Styles/svg/pause-two-lines-svgrepo-com.svg';
import { ReactComponent as PlusSvg } from '../../Styles/svg/plus-svgrepo-com (1).svg';

import basicDeck from "../../Cards";
import useSound from "use-sound";
import WildCardDrop from "../../Sounds/WildCardDrop.mp3";


export default function WildCard({ wildCardListener }) {
  let [wildCard, setWildCard] = useState([]);
//   const [cardDrop] = useSound(CardDrop, { volume: 0.3});
  const [wildCardSound] = useSound(WildCardDrop, { volume: 0.3 });

  useEffect(() => {
    if (wildCardListener) {
      setWildCard((prevState) => [
        ...prevState,
        {
          ...basicDeck[wildCardListener.card],
          deg: (Math.random() - 0.5) * 20,
          translateX: (Math.random() - 0.5) * 10,
          translateY: (Math.random() - 0.5) * 10,
        },
      ]);
    }
  }, [wildCardListener]);

  const transitions = useTransition(wildCard, {
    from: { opacity: 0, scale: 1.4 },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    enter: { opacity: 1, scale: 1  },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    leave: { opacity: 0, scale: 1.05},
    config: config.stiff,
    onStart: wildCardSound
  });

  return (
    <StyledQuadrant>
      {transitions((styles, item) => {
        return (
          <StyledCard
            style={{
              ...styles,
              transform: `rotate(${item.deg}deg) translateX(${item.translateX}px)`,
            }}
          >
            <p>Wild Card</p>
            {item.match[0] === "hash" && <HashSvg className="svg" />}
            {item.match[0] === "circle" &&  <CircleSvg className="svg"/>}
            {item.match[0] === "square" && <SquareSvg className="svg" />}
            {item.match[0] === "star" && <StarSvg className="svg" />}
            {item.match[0] === "donut" && <DonutSvg className="svg" />}
            {item.match[0] === "zig zag" &&  <ZigZagSvg className="svg"/>}
            {item.match[0] === "pause" &&  <PauseSvg className="svg"/>}
            {item.match[0] === "plus" &&  <PlusSvg className="svg"/>}

            {item.match[1] === "hash" && <HashSvg className="svg" />}
            {item.match[1] === "square" && <SquareSvg className="svg" />}
            {item.match[1] === "circle" &&  <CircleSvg className="svg"/>}
            {item.match[1] === "star" && <StarSvg className="svg" />}
            {item.match[1] === "donut" && <DonutSvg className="svg" />}
            {item.match[1] === "zig zag" &&  <ZigZagSvg className="svg"/>}
            {item.match[1] === "pause" &&  <PauseSvg className="svg"/>}
            {item.match[1] === "plus" &&  <PlusSvg className="svg"/>}
            <p>Wild Card</p>
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
  margin: 30px 20px;
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
  background-color: #630707;
  /* background-color: gold; */
  /* background: rgb(0, 5, 255);
  background: linear-gradient(
    40deg,
    rgba(0, 5, 255, 1) 0%,
    rgba(198, 3, 222, 1) 100%
  ); */
  color: white;
  height: 210px;
  width: 140px;
  border: ${(props) => (props.faceOff ? "3px solid green" : "3px solid black")};
  border-radius: 5px;
  background-color: #080808;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='69' height='69' viewBox='0 0 120 120'%3E%3Cpolygon fill='%23adadad' fill-opacity='0.07' points='120 120 60 120 90 90 120 60 120 0 120 0 60 60 0 0 0 60 30 90 60 120 120 120 '/%3E%3C/svg%3E");
  
  :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }
  p {
    font-weight: bold;
    padding-bottom: 4px;
    border-bottom: 2px solid white;
    font-size: 20px;
    :nth-child(1) {
      transform: rotateX(180deg) rotateY(180deg);
    }
  }
  .svg {
    height: 50px;
    /* fill: white; */
    /* fill: #cfa1b4; */
    fill: white;
    /* fill: url("#gradient-fill"); */
    /* margin: 10px 0px; */
  }
`;
