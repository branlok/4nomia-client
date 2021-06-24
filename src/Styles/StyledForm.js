import styled, {keyframes} from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export default styled.div`
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
    margin: 10px 0px;
    text-align: center;
  }
  .absolute-position {
    height: 300px;
    margin: 10px 0px;
    width: 500px;
    /* border: 2px solid yellow; */
    position: relative;
  }
  .container {
    position: absolute;
    top: 0px;
    left: 0px;
    border-radius: 10px;
    background-color: white;
    height: 300px;
    width: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    form {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      label {
        font-size: 20px;
        margin: 10px 0px;
        font-weight: bold;
      }
      input {
        padding: 5px;
        border-radius: 5px;
        width: 300px;
        border-style: none;
        border: 2px solid gray;
        outline: none;
        font-weight: bold;
        text-align: center;
        font-size: 20px;
      }
      .mock-password {
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 6px;
        -webkit-text-security: disc;
      }
      .prompt {
        position: absolute;
        top: 0px;
        left: 0px;
        display: flex;
        align-items: center;
        padding: 5px;
        justify-content: center;
        width: calc(100% - 10px);
        margin: 5px;
        border-radius: 5px;
        background-color: coral;
        color: white;
        font-weight: bold;
        animation: ${fadeIn} 0.5s ease backwards;
      }
      /* .password-field {
        font-family: Arial, Helvetica, sans-serif;
        letter-spacing: 6px;
      } */
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
    font-weight: bold;
    :hover {
      color: gray;
    }
  }
  .white-text {
    color: white;
  }
  .black {
    background-color: #7d1111;
    color: white;
  }
`;
