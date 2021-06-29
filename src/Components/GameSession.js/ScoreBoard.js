import { config, useTransition, animated } from "react-spring";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import styled from "styled-components";

function ScoreBoard({ faceoffResolvedListener }) {
  //FACE OFF WINNERS
  let { state } = useLocation();

  let [players, setPlayers] = useState();
  let [playersRank, setPlayersRank] = useState([]);

  //   let scoreTransition = useTransition(playersRank, {
  //     from: { opacity: 0 },
  //     leave: { opacity: 0 },
  //     enter: { opacity: 1 },
  //     // keys: playersRank,
  //     reverse: true,
  //     config: { duration: 2000 },
  //   });

  let height = 20;
  const transitions = useTransition(
    playersRank.map((data, i) => ({ id: data, y: i * height })),
    {
      from: { position: "absolute", opacity: 0 },
      leave: { height: 0, opacity: 0 },
      enter: ({ y }) => ({ y, opacity: 1 }),
      update: ({ y }) => ({ y }),
      keys: (d) => d.id,
      config: config.default,
    }
  );

  useEffect(() => {
    if (!players) {
      let playerList = {};
      let rank = [];
      state.init.playerPositions.map((item, index) => {
        let playerStats = {
          id: item[0],
          name: item[1],
          score: 0,
        };
        playerList[item[0]] = playerStats;
        rank.push(item[0]);
      });
      setPlayers(playerList);
      setPlayersRank(rank);
    }
  }, []);

  useEffect(() => {
    if (faceoffResolvedListener) {
      let id = faceoffResolvedListener.victor;
      setPlayers((prevState) => {
        return {
          ...prevState,
          [id]: { ...prevState[id], score: ++prevState[id].score },
        };
      });
      let newPlayerRank = playersRank.sort((a, b) => {
        return players[b].score - players[a].score;
      });
      setPlayersRank(newPlayerRank);
    }
  }, [faceoffResolvedListener]);

  if (playersRank && players) {
    console.log(playersRank.length);
    return (
      <StyledLeaderboard height={playersRank.length * 40 + 32}>
        <div className="scoreboard-title">Score</div>
        {transitions((style, item) => {
          return (
            <StyledRow
              style={{
                transform: style.y.to((y) => `translate3d(0,${y}px,0)`),
                ...style,
              }}
            >
              <div className="playerName"> {players[item.id].name} </div>
              <div className="playerScore">{players[item.id].score}</div>
            </StyledRow>
          );
        })}
        {/* {playersRank.map((item, idx) => {
          return (
            <div>
              {players[item].name} :{players[item].score}
            </div>
          );
        })} */}
      </StyledLeaderboard>
    );
  } else {
    return null;
  }
}

let StyledLeaderboard = styled.div`
  height: ${(props) => `${props.height}px`};
  width: 200px;
  background-color: rgba(255, 66, 66, 1);
  /* border: 2px solid black; */
  border-radius: 5px;
  padding: 5px;
  overflow: hidden;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  .scoreboard-title {
    height: 20px;
    margin-top: 5px;
    margin-bottom: 7px;
    text-align: center;
    font-weight: bold;
    color: white;
    border-bottom: 2px solid white;
  }
`;

let StyledRow = styled(animated.div)`
  border-radius: 5px;
  background-color: #d42f40 ;
  height: 30px;
  width: 190px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
  color: white;
  .playerName {
    padding-left: 10px;
  }
  .playerScore {
    padding-right: 10px;
  }
`;

export default ScoreBoard;
