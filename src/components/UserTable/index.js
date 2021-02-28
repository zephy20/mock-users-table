import React from "react";
import Table from "react-bootstrap/Table";
import SearchBox from "./SearchBox";
import "./styles/wrapper.scss";
import TableRow from "./TableRow";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

export default function UserTableWrapper({ rows, deleteUser, searchUsers }) {
  return (
    <div className="mainWrapper">
      <h4>Our Customers</h4>
      <SearchBox searchUsers={searchUsers} />
      <div className="alignRight topSpacing bottomSpacing">
        <Link to="/add-user">
          <Button
            variant="primary"
            className="leftSpacing"
            size="sm"
            style={{
              width: "30%"
            }}
          >
            Add User
          </Button>
        </Link>
      </div>
      <div>
        {rows && rows.length ? (
          <Table bordered>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(item => (
                <TableRow key={item.id} {...item} deleteUser={deleteUser} />
              ))}
            </tbody>
          </Table>
        ) : (
          <div>
            <h5>No Users!</h5>
          </div>
        )}
      </div>
    </div>
  );
}
