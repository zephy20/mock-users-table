import React, { useEffect, useState } from "react";
import UserTableWrapper from "../../components/UserTable";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUsers } from "../../redux/actions";
import { Spinner } from "react-bootstrap";
import ErrorPage from "../../components/UserDetails/UserNotFound";
import { debounce } from "lodash";

export default function UserTableContainer() {
  const userData = useSelector(state => state.users);
  const loader = useSelector(state => state.loader);
  const error = useSelector(state => state.error);
  const dispatch = useDispatch();
  const [currentSearchVal, setCurrentSearchVal] = useState("");

  const handleSearch = searchVal => {
    setCurrentSearchVal(searchVal);
  };

  const debouncedSearchFunc = debounce(handleSearch, 500);

  useEffect(() => {
    if (!userData || !userData.length) dispatch(getUsers());
  }, []);

  const deleteRow = userId => {
    dispatch(deleteUser({ userId }));
  };

  if (loader)
    return (
      <div className="topSpacing">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );

  if (error)
    return (
      <div className="topSpacing">
        <ErrorPage />
      </div>
    );

  let currentRows = userData;

  if (currentSearchVal)
    currentRows = userData.filter(item => {
      if (
        item.first_name.includes(currentSearchVal) ||
        item.last_name.includes(currentSearchVal) ||
        item.email.includes(currentSearchVal)
      )
        return true;
    });

  return (
    <UserTableWrapper
      rows={currentRows}
      deleteUser={deleteRow}
      searchUsers={debouncedSearchFunc}
    />
  );
}
