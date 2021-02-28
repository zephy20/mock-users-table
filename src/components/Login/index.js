import React from "react";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import "./styles/index.scss";
import "../UserDetails/styles/index.scss";

export default function LoginWrapper({
  email,
  password,
  inputErrors,
  handleInputChange,
  handleSubmit
}) {
  return (
    <div className="loginWrapper">
      <div className="loginContainer">
        <div className="header bottomSpacing">
          <h4>Login</h4>
        </div>
        <div className="leftAligned topSpacing">
          <h5>Email</h5>

          <FormControl
            placeholder="Enter email"
            value={email}
            onChange={e => handleInputChange(e, "email")}
          />
          {inputErrors && inputErrors.email && (
            <span className="errorText">{inputErrors.email}</span>
          )}
          <hr />
          <h5>Password</h5>
          <FormControl
            placeholder="Enter password"
            value={password}
            onChange={e => handleInputChange(e, "password")}
            type="password"
          />
          {inputErrors && inputErrors.password && (
            <span className="errorText">{inputErrors.password}</span>
          )}
          <div>
            <Button
              variant="outline-success"
              className="topSpacing"
              onClick={handleSubmit}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
