import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as MuteSVG } from "../Styles/svg/soundMute.svg";
import { ReactComponent as SoundOnSVG } from "../Styles/svg/soundMax.svg";
function VolumeToggle({ gameTheme, stop, playing, setPlaying }) {
  let startTheme = () => {
    setPlaying(true);
    gameTheme();
  };

  let endTheme = () => {
    setPlaying(false);
    stop();
  };

  return (
    <StyledVolumeToggle onClick={playing ? endTheme : startTheme}>
      {playing ? <SoundOnSVG className="svg" /> : <MuteSVG className="svg"  />}
    </StyledVolumeToggle>
  );
}

let StyledVolumeToggle = styled.div`
  position: absolute;
  left: 20px;
  top: 20px;
  color: white;
  .svg {
    fill: rgba(0,0,0,0.5);
    transition: 0.2s;
    cursor: pointer;
    :hover {
        /* transform: scale(1.1); */
        fill: rgba(0,0,0,1);
    }
  }
  

`;

export default VolumeToggle;
