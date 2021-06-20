import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import { Field, Form, Formik } from "formik";
import UsernameForm from "./UsernameForm";
import CreateRoom from "./CreateRoom";
import StyledForm from "../../Styles/StyledForm";
import { useTransition, animated, config } from "react-spring";

function CreateMenu({ socket }) {
  const [step, setStep] = useState("usernamePage");
  const [name, setName] = useState(null);
  const [pass, setPass] = useState(null);
  const history = useHistory();

  let transition = useTransition(step, {
    from: { opacity: 0, rotateX: "180deg" },
    enter: { opacity: 1, rotateX: "0deg" },
    leave: { opacity: 0, rotateX: "180deg" },
    config: config.gentle,
  });

  const emitRoomCreation = () => {
    socket.current.emit("setNewRoom", name, pass, (response) => {
      if (response.status == "success") {
        let code = response.connectedRoom;
        console.log(response, "read me");
        history.push(`/room/${code}`, {
          name,
          pass,
          code,
          role: "leader",
          roomState: response,
        });
      } else {
        window.alert(response.message);
      }
    });
  };

  useEffect(() => {
    if (step == "complete") {
      emitRoomCreation();
    }
  }, [step]);

  //   let InformationRequest =
  //     "usernamePage" == step ? (
  //       <UsernameForm setName={setName} setStep={setStep} />
  //     ) : (
  //       <CreateRoom setPass={setPass} setStep={setStep} />
  //     );

  return (
    <StyledForm>
      <h1>4NOMIA</h1>
      <div className="absolute-position">
        {transition((props, item) => {
          return "usernamePage" == item ? (
            <animated.div style={{ ...props }} className="container">
              <UsernameForm setName={setName} setStep={setStep} />
            </animated.div>
          ) : (
            <animated.div style={{ ...props }} className="container black">
              <CreateRoom setPass={setPass} setStep={setStep} />
            </animated.div>
          );
        })}
      </div>
    </StyledForm>
  );
}

// const StyledMenu = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   position: relative;
//   h1 {
//     font-size: 80px;
//     text-shadow: 0px 0px 6px black;
//     color: white;
//     margin: 0px 10px;
//     font: bold;
//     font-weight: 700;
//   }
//   h2 {
//     font-size: 20px;
//     margin: 10px 0px;
//   }
//   .container {
//     border-radius: 10px;
//     background-color: white;
//     height: 300px;
//     width: 500px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: center;
//     box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
//     form {
//       display: flex;
//       flex-direction: column;
//       justify-content: center;
//       align-items: center;
//     }
//     input {
//       padding: 5px;
//       border-radius: 5px;
//       width: 300px;
//       border-style: none;
//       border: 1px solid gray;
//       outline: none;
//       font-weight: bold;
//       text-align: center;
//       font-size: 20px;
//     }
//   }
//   .next-button {
//     position: absolute;
//     font-size: 16px;
//     margin: 10px;
//     bottom: 0px;
//     right: 0px;
//     border-style: none;
//     background-color: transparent;
//     transition: 0.2s;
//     cursor: pointer;
//     :hover {
//       color: gray;
//     }
//   }
// `;

export default CreateMenu;
