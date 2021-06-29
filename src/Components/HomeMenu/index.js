import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as DiscordSvg } from "../../Styles/svg/Discord-Logo-Black.svg";
import useSound from "use-sound";
import Click1 from "../../Sounds/Click_1.mp3";
import Click2 from "../../Sounds/Click_2.mp3";


function HomeMenu() {
  const [DownSound] = useSound(Click1);
  const [UpSound] = useSound(Click2);


  return (
    <StyledMenu>
      <h1>4NOMIA</h1>
      <ul>
        {/* <li>
          <Link to="/lobby">Lobby</Link>
        </li> */}
        <li>
          <Link onMouseOver={UpSound} onMouseDown={DownSound} onMouseUp={UpSound} to="/create">
            Create Room
          </Link>
        </li>
        {/* <li>
          <Link to="/join">Join By Code</Link>
        </li> */}
        {/* <li>
          <Link onMouseOver={UpSound} onMouseDown={DownSound} onMouseUp={UpSound} to="/setting">Settings</Link>
        </li> */}
      </ul>
      <div className="discordSvg">
        <a href="https://discord.gg/hfHjjwXM">
          <DiscordSvg className="discord" target="_blank" />
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
      transition: 0.3s;
      :hover {
        color: black;
      }
      :active {
        color: black;
      }
    }
    li {
      padding-top: 5px;
      font-size: 30px;
      color: white;
      transition: 0.1s;
      cursor: pointer;
      :hover {
        color: gray;
      }
      :active {
        transform: scale(0.95);
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
      transition: 0.3s;
      cursor: pointer;
      :hover {
        fill: white;
      }
    }
  }
`;

export default HomeMenu;
