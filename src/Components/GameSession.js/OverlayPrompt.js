import { useSpring, animated, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

function OverlayPrompt({
  firstTurn,
  firstPlayerName,
  endGame,
  playerPositions,
}) {
  let [msg, setMsg] = useState(firstPlayerName);
  let [ranks, setRanks] = useState();
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
      backgroundColor: "rgba(0,0,0,0)",
    },
    to: {
      opacity: endGame && 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    config: config.default,
    // onRest: () => setTimeout(() => setMsg(false), 1000),
  });

  useEffect(() => {
    if (endGame) {
      let leaderboard = [];

      endGame.results.forEach((item, index) => {
        if (playerPositions[index]) {
          if (item) {
            leaderboard.push({ name: playerPositions[index][1], score: item });
          } else {
            leaderboard.push({ name: playerPositions[index][1], score: 0 });
          }
        }
      });
      let sortedLeaderBoard = leaderboard.sort((first, second) => {
        return  second.score - first.score;
      });

      setRanks(sortedLeaderBoard);
      setMsg(true);
    }
  }, [endGame]);

  if (endGame) {
    return (
      <StyledOverlay style={endGameProp}>
        Game Finished!
        <div className="leaderboard">
          <h1>Leaderboard</h1>
          {ranks &&
            ranks.map((item, idx) => {
              return (
                <div className="player" key={item.name}>
                  <h2>Rank {idx + 1}</h2>
                  <div>
                    {item.name} <span className="with"> with </span>
                    <span className="points"> {item.score} pts</span>
                  </div>
                </div>
              );
            })}
          {/* {endGame.results.map((item, idx) => {
            if (item !== null) {
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
          })} */}
          <div className="footer">
            Thanks for playing ! <br /> To return to home press{" "}
            <Link to="/">here</Link>
          </div>
        </div>
      </StyledOverlay>
    );
  } else if (firstTurn) {
    return <StyledOverlay style={props}> You start first!</StyledOverlay>;
  } else if (!firstTurn) {
    return (
      <StyledOverlay style={props}>
        {" "}
        {firstPlayerName} goes first!
      </StyledOverlay>
    );
  } else {
    return null;
  }
}

const StyledOverlay = styled(animated.div)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  color: white;
  font-weight: bold;
  z-index: 2;
  transition: 0.2s;
  .footer {
    text-align: center;
    margin-top: 10px;
    font-size: 14px;
    color: gray;
    a {
      text-decoration: none;
    }
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
      font-weight: normal;
    }
    .points {
      color: green;
    }
  }
`;

export default OverlayPrompt;
