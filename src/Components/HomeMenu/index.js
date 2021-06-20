import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function HomeMenu() {
  return (
    <StyledMenu>
      <h1>4NOMIA</h1>
      <ul>
        <li>
          <Link to="/lobby">Lobby</Link>
        </li>
        <li>
          <Link to="/create">Create Room</Link>
        </li>
        <li>
          <Link to="/join">Join By Code</Link>
        </li>
        <li>
          <Link to="/setting">Settings</Link>
        </li>
      </ul>
    </StyledMenu>
  );
}

const StyledMenu = styled.div`
  h1 {
    font-size: 80px;
    
    color: white;
  }
  ul {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
    a {
      text-decoration: none;
      color: white;
      transition: 0.2s;
      :hover {
        color: gray;
      }
    }
    li {
      padding-top: 5px;
      font-size: 30px;
      color: white;
      transition: 0.2s;
      cursor: pointer;
      :hover {
        color: gray;
      }
    }
  }
`;

export default HomeMenu;
