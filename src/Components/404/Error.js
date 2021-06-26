import React from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";

function NotFound() {
  let location = useLocation();
    console.log(location, "read");

  return (
    <StyledNotFound>
      <div className="code">404</div>
      <div>{location?.state?.message || "Page Not Found"}</div>
      <div className="caption">
        <Link to="/">
          return to <span>home</span>
        </Link>
      </div>
    </StyledNotFound>
  );
}

let StyledNotFound = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: white;
  font-size: 40px;
  .code {
    margin: 10px;
    font-size: 100px;
  }
  .caption {
    margin: 50px;
    font-size: 24px;
    border: 2px solid white;
    border-radius: 50px;
    transition: 0.3s;
    cursor: pointer;
    a {
      text-decoration: none;
      color: white;
      padding: 10px;
      display: block;
    }
    span {
      color: gray;
    }
    :hover {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
`;

export default NotFound;
