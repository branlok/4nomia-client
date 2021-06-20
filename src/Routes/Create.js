import React from "react";
import styled from "styled-components";
import CreateMenu from "../Components/CreateMenu";

function Create({socket}) {
  return (
    <StyledCreateWrapper>
      <CreateMenu socket={socket}/>
    </StyledCreateWrapper>
  );
}

const StyledCreateWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #D42020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Create;
