import { animated, useTransition, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as CircleSvg } from "../../Styles/svg/presence-busy-16-filled-svgrepo-com.svg";
import { ReactComponent as SquareSvg } from "../../Styles/svg/stop-svgrepo-com.svg";
import { ReactComponent as StarSvg } from "../../Styles/svg/star-svgrepo-com (3).svg";
import { ReactComponent as DonutSvg } from "../../Styles/svg/record-svgrepo-com.svg";
import basicDeck from "../../Cards";

export default function WildCard({ wildCardListener }) {
  let [wildCard, setWildCard] = useState([]);

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
            style={{
              ...styles,
              transform: `rotate(${item.deg}deg) translateX(${item.translateX}px)`,
            }}
          >
            <p>Wild Card</p>
            {item.match[0] == "circle" && <CircleSvg className="svg" />}
            {item.match[0] == "square" && <SquareSvg className="svg" />}
            {item.match[0] == "star" && <StarSvg className="svg" />}
            {item.match[0] == "donut" && <DonutSvg className="svg" />}
            {item.match[1] == "circle" && <CircleSvg className="svg" />}
            {item.match[1] == "square" && <SquareSvg className="svg" />}
            {item.match[1] == "star" && <StarSvg className="svg" />}
            {item.match[1] == "donut" && <DonutSvg className="svg" />}
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
  border: ${(props) => (props.faceOff ? "3px solid green" : "1px solid black")};
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
    /* fill: white; */
    fill:#cfa1b4 ;
    /* fill: url("#gradient-fill"); */
    /* margin: 10px 0px; */
  }
`;
