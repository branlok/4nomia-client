import React from "react";
import styled from "styled-components";
import HomeMenu from "../Components/HomeMenu";

function Home() {
  return (
    <StyledHomeWrapper>
      <HomeMenu />
    </StyledHomeWrapper>
  );
}

const StyledHomeWrapper = styled.div`
  height: 100vh;
  width: 100%;
  background-color: #e04242;
  background-color: #D42020;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Home;
