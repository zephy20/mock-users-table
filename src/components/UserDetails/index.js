import React from "react";
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormControl from "react-bootstrap/FormControl";
import "./styles/index.scss";

export default function UserDetailsWrapper({
  user,
  type,
  inputErrors,
  handleInputChange,
  handleSubmit
}) {
  const { first_name, last_name, email } = user;

  return (
    <div className="userDetailsWrapper">
      <div className="userDetailsContainer">
        <div className="header bottomSpacing">
          <h4>{type === "add" ? "Add User" : "Edit User"}</h4>
          <Link to={`/`}>
            <Button variant="outline-primary">Go back</Button>
          </Link>
        </div>
        <div className="leftAligned topSpacing">
          <h5>First Name</h5>
          <FormControl
            placeholder="Enter First Name"
            value={first_name}
            onChange={e => handleInputChange(e, "first_name")}
          />
          {inputErrors && inputErrors.first_name && (
            <span className="errorText">{inputErrors.first_name}</span>
          )}
          <hr />
          <h5>Last Name</h5>
          <FormControl
            placeholder="Enter Last Name"
            value={last_name}
            onChange={e => handleInputChange(e, "last_name")}
          />
          {inputErrors && inputErrors.last_name && (
            <span className="errorText">{inputErrors.last_name}</span>
          )}
          <hr />
          <h5>Email</h5>

          <FormControl
            placeholder="Enter email"
            value={email}
            onChange={e => handleInputChange(e, "email")}
          />
          {inputErrors && inputErrors.email && (
            <span className="errorText">{inputErrors.email}</span>
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
