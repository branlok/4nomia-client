import { useSpring, animated, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";

function OverlayPrompt({ firstPlayerName, endGame, playerPositions }) {
  let [msg, setMsg] = useState(firstPlayerName);

  let props = useSpring({
    from: {
      scale: 0,
    },
    to: {
      scale: msg ? 1 : 0,
    },
    reverse: msg ? false : true,
    config: config.default,
    // onRest: () => setTimeout(() => setMsg(false), 1000),
    onRest: () => setMsg(false),
    delay: 1000,
  });

  let endGameProp = useSpring({
    from: {
      opacity: 0,
      backgroundColor: "rgba(0,0,0,0)"
    },
    to: {
      opacity: endGame && 1,
      backgroundColor: "rgba(0,0,0,0.5)"
    },
    config: config.default,
    // onRest: () => setTimeout(() => setMsg(false), 1000),
  });

  useEffect(() => {
    if (endGame) {
      setMsg(true);
    }
  }, [endGame]);

  if (endGame) {
    return (
      <StyledOverlay style={endGameProp} className="blackBackdrop">
        Game Finished!
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          {endGame.results.map((item, idx) => {
            if (item !== null && !playerPositions[idx]) {
              return (
                <div className="player" key={playerPositions[idx]}>
                  <h2>{idx + 1} Place</h2>
                  <div>
                    {playerPositions[idx][1]} <span className="with">with</span>
                    <span className="points"> {item ? item : 0} pts</span>
                  </div>
                </div>
              );
            }
          })}
        </div>
      </StyledOverlay>
    );
  }

  return (
    <StyledOverlay style={props}>{firstPlayerName} goes first!</StyledOverlay>
  );
}

const StyledOverlay = styled(animated.div)`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: white;
  font-weight: bold;
  z-index: 2;
  margin-bottom: 20px;
  transition: 0.2s;
  .blackBackdrop {
    background-color: rgba(0, 0, 0, 0.4);
  }
  .leaderboard {
    background-color: white;
    width: 500px;
    height: 300px;
    border-radius: 10px;
    border: 5px solid black;
    font-size: 20px;
    color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px;
    .player {
      width: 100%;
      background-color: #ebebeb;
      text-align: center;
      display: flex;
      justify-content: space-between;
      border-radius: 5px;
      margin: 5px;
      padding: 5px 10px;
    }
    .with {
      color: gray;
    }
    .points {
      color: green;
    }
  }
`;

export default OverlayPrompt;
