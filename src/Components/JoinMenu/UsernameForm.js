import { Field, Form, Formik } from "formik";
import React from "react";
import * as yup from "yup";

function UsernameForm({ code, setPayload, setView }) {
  let usernameSchema = yup.object().shape({
    username: yup.string().min(1, "too short").max(26, "too long").required("a display name is required"),
  });

  return (
    <>
      <Formik
        initialValues={{ username: "" }}
        validationSchema={usernameSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(val) => {
          setPayload(val);
          setView("passwordReq");
        }}
      >
        {({ errors }) => {
          return (
            <Form>
              {errors.username && <div className="prompt">{errors.username}</div>}
              {/* <label>Enter Room Code</label>
            <Field autoComplete={false} name="code"></Field> */}
              <label>Name</label>
              <Field autoComplete={false} name="username"></Field>
              <button className="next-button">next</button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}

export default UsernameForm;
