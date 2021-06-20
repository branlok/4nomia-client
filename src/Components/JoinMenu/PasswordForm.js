import { Field, Form, Formik } from "formik";
import React from "react";

function PasswordForm({ code, setPayload, setView }) {
  return (
    <>
      <Formik
        initialValues={{ password: "" }}
        onSubmit={(val) => {
          setPayload((prevState) => {
            return { ...prevState, ...val };
          });
          setView("enter")
        }}
      >
        <Form>
          {/* <label>Enter Room Code</label>
          <Field autoComplete={false} name="code"></Field> */}
          <label>This room requires a password</label>
          <Field autoComplete={false} name="password" className="mock-password"></Field>
          <button type="submit" className="next-button white-text">next</button>
        </Form>
      </Formik>
    </>
  );
}

export default PasswordForm;
