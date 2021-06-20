import React, { useContext, useEffect, useState } from "react";
import { Redirect, useHistory, useLocation, useParams } from "react-router-dom";
import styled from "styled-components";
import SocketContext from "../../Context/socket";
import Leader from "./Leader";
import Member from "./Member";

function PartyRoom() {
  let { state } = useLocation();
  console.log(state, "wtf");
  let history = useHistory();
  let socket = useContext(SocketContext);
  // let [members, setMembers] = useState({});
  let [roomState, setRoomState] = useState(state.roomState);
  console.log(roomState, "this");
  let [allowStart, setAllowStart] = useState(false);
  // let [startGame, setStartGame] = useState(false);
  // let {code} = useParams()

  const startGame = () => {
    socket.emit("startGame", state.code, (response) => {
      console.log(response);
      // setInRoom(true);
    });
  };

  const readyUp = () => {
    console.log("readyup");
    socket.emit("userReady", state.code, state.name, (response) => {
      console.log(response);
    });
  };

  const notReady = () => {
    console.log("notready");
    socket.emit("userNotReady", state.code, state.name, (response) => {
      console.log(response);
    });
  };

  useEffect(() => {
    console.log(state);
    console.log(socket.id);
    //leave page if state doesnt exists
    socket.on("roomUpdates", (response) => {
      console.log(response, "wtf");
      setRoomState((prevState) => {
        console.log(response, "read me");
        return { ...prevState, ...response };
      });
      // setMembers(response.currentMembers);
    });

    socket.on("startGame", (response) => {
      console.log(response);
      if (response.message == "start") {
        console.log(response);
        setRoomState((prevState) => ({ ...prevState, ...response }));

        history.push(`/session/${state.code}`, {
          init: response.init,
          code: state.code,
          roomState: roomState,
        });
      }
    });

    socket.on("creatorAnnouncement", (response) => {
      console.log(response);
      if (response.command == "start game") {
        setAllowStart(true);
      } else {
        setAllowStart(false);
      }
    });

    socket.on("roomAnnouncement", (response) => {
      console.log(response);
    });

    if (!state) {
      history.push("/join");
    }
    
    return () => {
      socket.off("roomUpdates");
      socket.off("creatorAnnouncement");
      socket.off("startGame");
      socket.off("roomAnnouncement");
    };
  });
  
  if (state.role === "leader") {
    return (
      <StyledMenu>
        <Leader
          startGame={startGame}
          allowStart={allowStart}
          roomState={roomState}
        />
      </StyledMenu>
    );
  } else if (state.role === "member") {
    return (
      <StyledMenu>
        <Member roomState={roomState} readyUp={readyUp} notReady={notReady} />
      </StyledMenu>
    );
  } else {
    return <div> Something went wrong </div>;
  }
}

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  h1 {
    font-size: 80px;
    text-shadow: 0px 0px 6px black;
    color: white;
    margin: 0px 10px;
    font: bold;
    font-weight: 700;
  }
  h2 {
    font-size: 20px;
    margin: 5px 0px;
  }
  .greetings {
    font-size: 26px;
  }
  .instructions {
    color: gray;
  }
  .codeWrapper {
    display: flex;
    align-items: center;
    position: relative;
    
    .code {
      font-size: 20px;
      transition: 0.2s;
      border: 2px solid black;
      padding: 10px;
      margin: 15px 0px;
      border-radius: 5px;
      position: relative;
      :hover {
        background-color: aliceblue;
      }
    }
  }

  .container {
    border-radius: 10px;
    padding: 10px;
    background-color: white;
    height: 300px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    text-align: center;
    tra
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }
    input {
      padding: 5px;

      border-radius: 5px;
      width: 300px;
      border-style: none;
      border: 1px solid gray;
      outline: none;
      font-weight: bold;
      text-align: center;
      font-size: 20px;
    }
  }
  .next-button {
    position: absolute;
    font-size: 16px;
    margin: 10px;
    bottom: 0px;
    right: 0px;
    border-style: none;
    background-color: transparent;
    transition: 0.2s;
    cursor: pointer;
    :hover {
      color: gray;
    }
  }
  .notif {
    height: 25px;
    margin-top: -20px;
    margin-bottom: 10px;
    width: 100%;
  }
`;

export default PartyRoom;
