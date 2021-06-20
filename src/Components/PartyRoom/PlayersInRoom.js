import React from "react";
import styled from "styled-components";
function PlayersInRoom({ roomState }) {
  return (
    <>
      Players in the room
      <StyledPlayerList>
        {Object.keys(roomState.currentMembers).map((item, index) => {
          return (
            <div className="name" key={item}>
              {roomState[item].username}
            </div>
          );
        })}
      </StyledPlayerList>
    </>
  );
}

const StyledPlayerList = styled.div`
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  align-items: center;
  align-content: stretch;
  /* background-color: ghostwhite; */
  /* border-radius: 5px; */
  border-top: 5px solid #dbdbdb;
  margin-top: 10px;
  .name {
    color: white;
    background-color: black;
    border: 2px solid black;
    padding: 5px 10px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 5px;
    margin: 5px;
  }
`;

export default PlayersInRoom;
