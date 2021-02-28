import React, { useState } from "react";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";

export default function SearchBox({ searchUsers }) {
  const [input, setInput] = useState("");

  const handleInputChange = e => {
    setInput(e.target.value);
    searchUsers(e.target.value);
  };

  return (
    <InputGroup className="mb-3">
      <InputGroup.Prepend>
        <InputGroup.Text id="basic-addon1">Search</InputGroup.Text>
      </InputGroup.Prepend>
      <FormControl
        placeholder="Search for names, emails"
        aria-label="Username"
        aria-describedby="basic-addon1"
        value={input}
        onChange={handleInputChange}
      />
    </InputGroup>
  );
}
