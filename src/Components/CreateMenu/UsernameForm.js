import { Field, Form, Formik } from "formik";
import React from "react";

function UsernameForm({ setName, setStep }) {
  return (
    <>
      <Formik
        initialValues={{ name: "" }}
        onSubmit={(val) => {
          setName(val.name);
          setStep("another");
        }}
      >
        <Form>
          <label>ENTER YOUR DISPLAY NAME</label>
          <Field name="name"></Field>
          <button className="next-button">Next</button>
        </Form>
      </Formik>
    </>
  );
}

export default UsernameForm;
