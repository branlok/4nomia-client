import React, { useContext } from "react";
import basicDeck from "../../Cards";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useTransition, animated, config } from "react-spring";
import { useLocation } from "react-router";
import SocketContext from "../../Context/socket";
import CardDrop from "../../Sounds/cardDrop.mp3";
import CardOut from "../../Sounds/cardOut.mp3";
import useSound from "use-sound";

import { ReactComponent as CircleSvg } from "../../Styles/svg/presence-busy-16-filled-svgrepo-com.svg";
import { ReactComponent as SquareSvg } from "../../Styles/svg/stop-svgrepo-com.svg";
import { ReactComponent as StarSvg } from "../../Styles/svg/star-svgrepo-com (3).svg";
import { ReactComponent as DonutSvg } from "../../Styles/svg/record-svgrepo-com.svg";

import { ReactComponent as HashSvg } from "../../Styles/svg/hash-svgrepo-com.svg";
import { ReactComponent as ZigZagSvg } from "../../Styles/svg/zigzag-hieroglyph-svgrepo-com.svg";
import { ReactComponent as PauseSvg } from "../../Styles/svg/pause-two-lines-svgrepo-com.svg";
import { ReactComponent as PlusSvg } from "../../Styles/svg/plus-svgrepo-com (1).svg";

export default function Hand({ faceoffListener, playerDraw, playerId }) {
  const { state } = useLocation();
  const socket = useContext(SocketContext);
  const [items, setItems] = useState([]);
  const [faceoff, setFaceoff] = useState(false);
  const [cardDrop] = useSound(CardDrop, { volume: 0.3 });
  const [cardOut] = useSound(CardOut, { volume: 0.3 });
  const [discard, setDiscard] = useState(false);

  useEffect(() => {
    if (playerDraw) {
      if (playerDraw.playerId === playerId) {
        setItems((prevState) => [
          ...prevState,
          {
            socket: playerId,
            id: playerDraw.card,
            ...basicDeck[playerDraw.card],
            deg: (Math.random() - 0.5) * 20,
            translateX: (Math.random() - 0.5) * 10,
            translateY: (Math.random() - 0.5) * 10,
            z: items.length,
          },
        ]);
      }
    }
  }, [playerDraw]);

  useEffect(() => {
    if (faceoffListener) {
      if (faceoffListener.playersInvolved.includes(playerId)) {
        // console.log(playerId, "challenged");
        setFaceoff(true);
        setDiscard(true);
      }
    }
  }, [faceoffListener]);

  useEffect(() => {
    socket.on(`faceoff_resolved_${playerId}`, (response) => {
      setFaceoff(false);
      setItems((prevState) => {
        let newArray = [...prevState];
        newArray.pop();
        return newArray;
      });
      if (response.victor === playerId) {
        // console.log("you won");
      }
    });

    return () => {
      socket.off(`faceoff_resolved_${playerId}`);
    };
  });

  let handleDiscardSound = () => {
    if (discard) {
      cardDrop();
      setDiscard(false);
    } else {
      cardOut();
    }
  };

  const transitions = useTransition(items, {
    from: { opacity: 0, scale: 1.4, translateX: 80 },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    enter: { opacity: 1, scale: 1, translateX: 0 },
    //replace: { opacity: 0, transform: "scale(1.2)" },
    leave: { opacity: 0, scale: 1.05, translateX: -50 },
    config: config.stiff,
    onStart: handleDiscardSound,
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
            <p>{item.value}</p>
            {item.match[0] === "hash" && <HashSvg className="svg red" />}
            {item.match[0] === "square" && <SquareSvg className="svg orange" />}
            {item.match[0] === "star" && <StarSvg className="svg indigo" />}
            {item.match[0] === "donut" && <DonutSvg className="svg yellow" />}
            {item.match[0] === "circle" && <CircleSvg className="svg brown" />}
            {item.match[0] === "pause" && <PauseSvg className="svg purple" />}
            {item.match[0] === "plus" && <PlusSvg className="svg green" />}
            {item.match[0] === "zig zag" && <ZigZagSvg className="svg" />}
            <p>{item.value}</p>
          </StyledCard>
        );
      })}

      {/* {!opponent && <button onClick={draw}>Draw Card</button>} */}
    </StyledQuadrant>
  );
}
const StyledQuadrant = styled.div`
  background-color: #b00c0f;
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
  padding: 5px;
  /* background: radial-gradient(circle at 50% 50%, #ffffff, #f7f7f7, #f0f0f0); */
  /* box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1); */
  height: 210px;
  width: 140px;
  border: ${(props) =>
    props.faceOff ? "3px solid #6abf63" : "3px solid black"};
  border-radius: 5px;

  /* :hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  } */
  p {
    text-align: center;
    font-weight: bold;
    font-size: 22px;

    :nth-child(1) {
      transform: rotateX(180deg) rotateY(180deg);
    }
  }
  .svg {
    height: 50px;
    fill: #212121;
  }
  .red {
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
  }
`;
