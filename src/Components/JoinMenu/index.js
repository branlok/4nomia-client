import React, { useContext, useEffect, useState } from "react";

import styled from "styled-components";
// import { Field, Form, Formik } from "formik";
import SocketContext from "../../Context/socket";
import { useHistory, useParams } from "react-router";
import UsernameForm from "./UsernameForm";
import PasswordForm from "./PasswordForm";
import StyledForm from "../../Styles/StyledForm";
import { useTransition, animated, config } from "react-spring";

function JoinMenu() {
  const [view, setView] = useState("username");
  const [passwordReq, setpasswordReq] = useState(null);
  const [payload, setPayload] = useState(null);
  let socket = useContext(SocketContext);
  let history = useHistory();
  let { code } = useParams();

  let transition = useTransition(view, {
    from: { opacity: 0, rotateX: "180deg" },
    enter: { opacity: 1, rotateX: "0deg" },
    leave: { opacity: 0, rotateX: "180deg" },
    config: config.gentle,
  });

  useEffect(() => {
    socket.emit("passwordInquiry", code, (response) => {
      console.log(response);
      if (response.password) {
        setpasswordReq(true);
      } else {
        setpasswordReq(false);
      }
    });
  }, []);

  const JoinRoom = () => {
    socket.emit(
      "joinNewRoom",
      code,
      payload.username,
      payload.password,
      (response) => {
        console.log(response, "check me");
        history.push(`/room/${code}`, {
          code,
          name: payload.username,
          role: "member",
          roomState: response.roomState,
        });
      }
    );
  };

  useEffect(() => {
    console.log("fired");
    socket.emit("checkRoom", code, (response) => {
      if (response.status == "error") {
        history.push("/error", { message: response.message });
      } else {
          console.log(response);
      }
    });
  }, [code]);

  useEffect(() => {
    if (payload && view === "enter") {
      console.log("i ran");
      JoinRoom();
    }
  }, [view]);

  return (
    <StyledForm>
      <h1>4NOMIA</h1>
      <div className="absolute-position">
        {transition((props, item) => {
          return "username" == item ? (
            <animated.div style={{ ...props }} className="container">
              <UsernameForm
                passwordReq={passwordReq}
                setPayload={setPayload}
                setView={setView}
              />
            </animated.div>
          ) : (
            <animated.div style={{ ...props }} className="container black">
              <PasswordForm code={code} setPayload={setPayload} setView={setView} payload={payload}/>
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
//   label {
//     font-size: 20px;
//     margin: 10px 0px;
//   }
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
//       transition: 0.3s;
//       :disabled {
//         background-color: gray;
//         display: none;
//       }
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

export default JoinMenu;
