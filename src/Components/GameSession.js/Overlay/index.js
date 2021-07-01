import { useSpring, animated, config } from "react-spring";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Leaderboard from "./Leaderboard";
import Disconnection from "./Disconnection";
function OverlayPrompt({
  firstTurn,
  firstPlayerName,
  endGame,
  playerPositions,
}) {
    let [showOverlay, setShowOverlay] = useState(true);
  let [ranks, setRanks] = useState([]);
  
  let beginningAnimation = useSpring({
    from: {
      scale: 0,
    },
    to: {
      scale: 1,
    },
    reverse: showOverlay ? false : true,
    config: config.default,
    onRest: () => setShowOverlay(false),
    delay: 1000,
  });

  let endAnimation = useSpring({
    from: {
      opacity: 0,
      backgroundColor: "rgba(0,0,0,0)",
    },
    to: {
      opacity: endGame ? 1 : 0,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    config: config.default,
  });

  useEffect(() => {
    if (endGame.action == "endgame") {
    let sortedRanks = sortPlayerRank(endGame.results, playerPositions)
      setRanks(sortedRanks);
      setShowOverlay(true);
    } else if (
      endGame.action == "disconnection" 
    ) {
        setShowOverlay(true);
    }
  }, [endGame]);
  

  if (endGame) {
    return (
      <StyledOverlay style={endAnimation}>
         {endGame.action == "disconnection" && <Disconnection/>}
         {endGame.action == "endgame" &&  <Leaderboard endGame={endGame} ranks={ranks} />}
      </StyledOverlay>
    );
  } else {
    return <StyledOverlay style={beginningAnimation}> <div className="start-instruction">{firstTurn ? "You start first!" : `${firstPlayerName} goes first!`}</div></StyledOverlay>
  }
}


function sortPlayerRank(results, playerPositions){
    let leaderboard = [];
    results.forEach((item, index) => {
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
      return sortedLeaderBoard;
}

const StyledOverlay = styled(animated.div)`
  height: 100vh;
  width: 100vw;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  color: white;
  font-weight: bold;
  z-index: 2;
  /* transition: 0.2s; */
  text-align: center;
  .start-instruction {
    text-align: center;
    font-size: 60px;
  }
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
