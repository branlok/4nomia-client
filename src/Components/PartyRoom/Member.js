import React, { useState } from "react";
import { useLocation } from "react-router";
import PlayersInRoom from "./PlayersInRoom";
import UserIndicator from "./UserIndicator";

function Member({ roomState, readyUp, notReady }) {
  const { state } = useLocation();
  const [ready, setReady] = useState(false);
  if (!roomState?.currentMembers) return null;
  return (
    <>
      <h1>4NOMIA</h1>
      <div className="container">
        <h2>Hello {state.name}!</h2>
        <h2>Press the ready button when you are</h2>
        <PlayersInRoom roomState={roomState} />
      </div>

      <button
        className="next-button"
        onClick={() => {
          ready ? notReady() : readyUp();
          setReady((prevState) => !prevState);
        }}
      >
        {ready ? "Cancel" : "Ready"}
      </button>
      <UserIndicator roomState={roomState} />
    </>
  );
}

export default Member;
