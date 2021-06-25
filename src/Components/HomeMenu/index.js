import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DiscordSvg } from "../../Styles/svg/Discord-Logo-Black.svg";
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
      <div className="discordSvg">
        <a href="https://discord.gg/hfHjjwXM">
          <DiscordSvg className="discord" target="_blank"/>
        </a>
      </div>
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
  .discordSvg {
    position: absolute;
    bottom: 0px;
    left: 0px;
    width: 100%;
    margin-bottom: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    .discord {
      height: 25px;
      width: 25px;
      fill: #23272a;
      transition: 0.5s;
      cursor: pointer;
      :hover {
        fill: black;
      }
    }
  }
`;

export default HomeMenu;
