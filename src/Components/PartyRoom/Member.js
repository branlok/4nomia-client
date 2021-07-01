import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import PlayersInRoom from "./PlayersInRoom";
import UserIndicator from "./UserIndicator";

function Member({ roomState, readyUp, notReady }) {
  const { state } = useLocation();
  const [ready, setReady] = useState(false);

  let toggleReady = (e) => {
    if (e.code == "Space" && !e.repeat) {
      ready ? notReady() : readyUp();
      setReady((prevState) => !prevState);
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", toggleReady);
    return () => window.removeEventListener("keyup", toggleReady);
  }, [ready]);

  if (!roomState.currentMembers) return null;
  return (
    <>
      <h1>4NOMIA</h1>
      <div className="container">
        <h2>Hello {state.name}!</h2>
        <h2 className="instructions">Press the ready button when you are</h2>
        <PlayersInRoom roomState={roomState} />
      </div>

      <button className="next-button" onClick={() => {
          ready ? notReady() : readyUp();
          setReady((prevState) => !prevState);
        }}>
        {ready ? "Cancel" : "Ready"}
      </button>
      <UserIndicator roomState={roomState} />
    </>
  );
}

export default Member;
