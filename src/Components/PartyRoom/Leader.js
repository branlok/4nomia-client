import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";
import styled, { keyframes } from "styled-components";
import PlayersInRoom from "./PlayersInRoom";
import UserIndicator from "./UserIndicator";
import { ReactComponent as Clipboard } from "../../Styles/svg/clipboard-svgrepo-com.svg";
import { ReactComponent as Check } from "../../Styles/svg/check-svgrepo-com (3).svg";
import { useSpring, animated, useTransition, config } from "react-spring";

function Leader({ roomState, startGame, allowStart }) {
  let { state } = useLocation();
  let [animate, setAnimate] = useState(false);
  let [message, setMessage] = useState();
  let [prompt, setPrompt] = useState(false);

  const props = useSpring({
    from: { translateX: "0px" },
    to: animate
      ? [
          { translateX: "20px" },
          { translateX: "-20px" },
          { translateX: "20px" },
          { translateX: "0px" },
        ]
      : { translateX: "0px" },
    // translateX: animate ? "5px" : "0px",
    config: { duration: 50 },
    onRest: () => setAnimate(false),
  });

  const transitions = useTransition(prompt, {
    from: { opacity: 0, translateY: -10 },
    enter: { opacity: 1, translateY: 0 },
    leave: { opacity: 0, translateY: -10 },
    reverse: prompt,
    // onRest: () => setPrompt(false),
    config: config.default,
  });

  let [copied, setCopied] = useState(false);
  let link = useRef(null);
  const handleStart = () => {
    if (allowStart) {
      startGame();
    } else {
      console.log(prompt, "read me");
      if (Object.keys(roomState.currentMembers).length == 1) {
        setAnimate(true);
        setPrompt(true);
        setMessage("Require at least two players to start game");
      } else if (!allowStart) {
        setMessage("All players needs to be ready");
        setPrompt(true);
        setAnimate(true);
      }
      return;
    }
  };

  const linktoClipboard = () => {
    navigator.clipboard.writeText(link.current.innerHTML);
    setCopied(true);
  };

  //   useEffect(() => {
  //     let time;
  //     if (prompt) {
  //       time = setTimeout(() => setPrompt(false), 1000);
  //     }
  //     return () => clearTimeout(time);
  //   }, [prompt]);

  if (!roomState?.currentMembers) return null;

  return (
    <>
      <h1>4NOMIA</h1>
      <div className="container">
        <div className="notif">
          {transitions((props, items) => {
            return (
              items && <StyledPrompt style={props}>{message}</StyledPrompt>
            );
          })}
        </div>
        <h2 className="greetings">Hello {state.name}!</h2>
        <h2 className="instructions">
          invite friends to join with the link below
        </h2>
        <div className="codeWrapper">
          <h2 className="code" ref={link}>
            https://{window.location.hostname}/join/{state.code}
          </h2>
          <StyledCopyClipboardBtn onClick={linktoClipboard} copied={copied}>
            {copied ? <Check className="svg" /> : <Clipboard className="svg" />}
          </StyledCopyClipboardBtn>
        </div>
        <PlayersInRoom roomState={roomState} />
      </div>
      <UserIndicator roomState={roomState} />
      {/* <animated.div > */}
      <StyledButton disable={!allowStart} style={props} onClick={handleStart}>
        Start
      </StyledButton>
      {/* </animated.div> */}
    </>
  );
}

const StyledCopyClipboardBtn = styled.button`
  display: flex;
  align-items: center;
  position: absolute;
  right: -50px;
  /* padding: 10px; */
  height: 44px;
  width: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  border-style: none;
  border: 2px solid gainsboro;
  background-color: ${(props) => (props.copied ? "DarkOliveGreen" : "#e3e3e3")};
  transition: 0.1s;
  cursor: pointer;
  :hover {
    background-color: ${(props) =>
      props.copied ? "DarkOliveGreen" : "gainsboro"};
  }
  :active {
    transform: scale(1.05);
  }
  .svg {
    height: 20px;
    fill: ${(props) => (props.copied ? "white" : "gray")};
    transition: 0.1s;
    cursor: pointer;
  }
  .notif {
    position: absolute;
    right: -65px;
    font-size: 16px;
    color: white;
    background-color: black;
    padding: 4px;
    border-radius: 5px;
  }
`;

// function PlayersInRoom({ roomState }) {
//   return (
//     <>
//       Players in the room
//       <StyledPlayerList>
//         {Object.keys(roomState.currentMembers).map((item, index) => {
//           return (
//             <div className="name" key={item}>
//               {roomState[item].username}
//             </div>
//           );
//         })}
//       </StyledPlayerList>
//     </>
//   );
// }

const StyledButton = styled(animated.button)`
  position: absolute;
  font-size: 18px;
  margin: 10px;
  bottom: 0px;
  right: 0px;
  border-style: none;
  background-color: transparent;
  transition: 0.2s;
  cursor: pointer;
  color: ${(props) => (props.disable ? "gray" : "green")};
  :hover {
    color: gray;
  }
`;

const StyledPrompt = styled(animated.div)`
  background-color: coral;
  font-weight: bold;
  border-radius: 5px;
  padding: 5px;
  /* width: 100%; */
  overflow: hidden;
`;

export default Leader;
