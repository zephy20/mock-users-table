import React, { useState, useLayoutEffect } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../api";
import LoginWrapper from "../../components/Login";
import Alert from "react-bootstrap/Alert";

export default function LoginContainer() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: ""
  });
  const [isSubmitted, setIsSubmitted] = useState(null);
  const [inputErrors, setInputErrors] = useState(null);
  const history = useHistory();

  useLayoutEffect(() => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) history.push("/");
  }, []);

  const handleSubmit = async () => {
    const errors = validatedUserDetails();

    if (Object.keys(errors).length) {
      setInputErrors(errors);
      return;
    }
    const res = await loginUser(loginDetails);

    if (res.token) {
      localStorage.setItem("loginToken", res.token);
      setIsSubmitted({ status: "success", message: "Succesful Login!" });
      setTimeout(() => {
        history.push("/");
      }, 1500);
    } else {
      setIsSubmitted({ status: "danger", message: res.error });
    }
  };

  const validatedUserDetails = () => {
    let errors = {};

    if (!loginDetails.email)
      errors = {
        ...errors,
        email: "Email required"
      };

    if (!loginDetails.password)
      errors = {
        ...errors,
        password: "Password required"
      };

    return errors;
  };

  const handleInputChange = (e, inputType) => {
    const updatedUser = {
      ...loginDetails,
      [inputType]: e.target.value
    };

    setLoginDetails(updatedUser);
  };

  return (
    <>
      {isSubmitted && (
        <Alert variant={isSubmitted.status}>{isSubmitted.message}</Alert>
      )}
      <LoginWrapper
        {...loginDetails}
        inputErrors={inputErrors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </>
  );
}
