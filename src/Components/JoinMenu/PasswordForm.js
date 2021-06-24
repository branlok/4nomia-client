import { Field, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router";
import SocketContext from "../../Context/socket";
import * as yup from "yup";

function PasswordForm({ code, setPayload, payload, setView }) {
  let socket = useContext(SocketContext);
  let history = useHistory();
  let [serverMessage, setServerMessage] = useState(null);
  let passwordSchema = yup.object().shape({
    password: yup
      .string()
      .min(1)
      .max(200, "too long")
      .required("password is required"),
  });

  const JoinRoom = (password, formik) => {
    socket.emit("joinNewRoom", code, payload.username, password, (response) => {
      console.log(response.message);
      if (response.message == "wrong password") {
        setServerMessage(response);
        formik.resetForm();
      } else {
        console.log(response, "check me");
        history.push(`/room/${code}`, {
          code,
          name: payload.username,
          role: "member",
          roomState: response.roomState,
        });
      }
    });
  };

  return (
    <>
      <Formik
        initialValues={{ password: "" }}
        validationSchema={passwordSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={(val, formik) => {
          JoinRoom(val.password, formik);
          // JoinRoom(val.password);
          //   setPayload((prevState) => {
          //     return { ...prevState, ...val };
          //   });
          //   setView("enter");
        }}
      >
        {({ errors }) => {
          return (
            <Form>
              {serverMessage && (
                <div className="prompt">{serverMessage.message}</div>
              )}
              {errors.password && (
                <div className="prompt">{errors.password}</div>
              )}
              {/* <label>Enter Room Code</label>
          <Field autoComplete={false} name="code"></Field> */}
              <label>This room requires a password</label>
              <Field
                autoComplete={false}
                name="password"
                className="mock-password"
              ></Field>
              <button type="submit" className="next-button white-text">
                next
              </button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default PasswordForm;
