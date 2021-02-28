import Button from "react-bootstrap/Button";
import React from "react";
import { Link } from "react-router-dom";
import DeleteButton from "./DeleteButton";

export default function TableRow({
  id,
  first_name,
  last_name,
  email,
  deleteUser
}) {
  return (
    <tr>
      <td>{`${first_name} ${last_name}`}</td>
      <td>{email}</td>
      <td>
        <div className="flex alignItemscenter justifyContentCenter">
          <Link to={`/users?id=${id}`}>
            <Button variant="outline-primary" size="sm">
              Edit
            </Button>
          </Link>
          <DeleteButton handleDelete={() => deleteUser(id)} />
        </div>
      </td>
    </tr>
  );
}
