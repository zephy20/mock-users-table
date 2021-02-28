import React from "react";
import { render, fireEvent } from "@testing-library/react";
import TableRow from "../TableRow";
import { BrowserRouter as Router } from "react-router-dom";

const sampleRow = {
  id: 1,
  first_name: "George",
  last_name: "Bluth",
  email: "george.bluth@reqres.in"
};

describe("TableRow", () => {
  test("renders Table Row component", () => {
    const onClick = jest.fn();

    // as RTL renders into a div as a container by default, so we change that to table to avoid
    // DOM nesting validation error
    const tableBody = document.createElement("tbody");

    const { getByText } = render(
      <Router>
        <TableRow {...sampleRow} deleteUser={onClick} />
      </Router>,
      {
        container: document.body.appendChild(tableBody)
      }
    );
    expect(getByText("Delete")).toBeInTheDocument();
  });
});
