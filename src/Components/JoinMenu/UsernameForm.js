import { Field, Form, Formik } from "formik";
import React from "react";

function UsernameForm({ code, setPayload, setView }) {
  return (
    <>
      <Formik
        initialValues={{ username: "" }}
        onSubmit={(val) => {
          setPayload(val);
          setView("passwordReq");
        }}
      >
        <Form>
          {/* <label>Enter Room Code</label>
          <Field autoComplete={false} name="code"></Field> */}
          <label>Name</label>
          <Field autoComplete={false} name="username"></Field>
          <button className="next-button">next</button>
        </Form>
      </Formik>
    </>
  );
}

export default UsernameForm;
