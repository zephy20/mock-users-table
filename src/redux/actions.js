import { getAllUsers, deleteAUser } from "../api";
import {
  GET_USERS,
  DELETE_USER,
  GET_USERS_SUCCESS,
  GET_USERS_FAILURE
} from "./actionTypes";

export const getUsers = () => {
  return dispatch => {
    dispatch({ type: GET_USERS });
    return getAllUsers().then(
      users => dispatch({ type: GET_USERS_SUCCESS, response: users }),
      err => dispatch({ type: GET_USERS_FAILURE, err })
    );
  };
};

export const deleteUser = payload => {
  return dispatch => {
    return deleteAUser(payload.userId).then(() =>
      dispatch({ type: DELETE_USER, payload })
    );
  };
};
