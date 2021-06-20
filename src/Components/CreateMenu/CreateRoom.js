import { Field, Form, Formik } from "formik";
import React from "react";

function CreateRoom({setPass, setStep}) {
  return (
    <div className="black">
      <h2>ROOM PASSWORD</h2>
      <Formik
        initialValues={{ password: null }}
        onSubmit={(val) => {
            setPass(val.password);
            setStep("complete")
        }}
      >
        <Form> 
          <Field className="mock-password" name="password" autoComplete={false}></Field>
          <button className="next-button white-text">CREATE ROOM WITH PASSWORD</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreateRoom;
