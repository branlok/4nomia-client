import React from 'react'
import { Link } from 'react-router-dom';

function Leaderboard({ranks, endGame }) {
    
    return (
        <>
            Game Finished!
        <div className="leaderboard">
          <h1>Leaderboard</h1>

          {ranks && endGame.action == "endgame" &&
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
          <div className="footer">
            Thanks for playing ! <br /> To return to home press{" "}
            <Link to="/">here</Link>
          </div>
        </div>
        </>
    )
}

export default Leaderboard
