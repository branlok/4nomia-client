import React from 'react'
import { Link } from 'react-router-dom'

function Disconnection() {
    return (
        <>
        A User <br/> has disconnected
        <div className="leaderboard">
          <h1>Return to Menu</h1>
          <div className="footer">
            Click here to return
            <Link to="/"> here</Link>
          </div>
        </div>
        </>
    )
}

export default Disconnection
