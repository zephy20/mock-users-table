import axios from "axios";

export const getAllUsers = async () => {
  try {
    const res = await axios.get(`https://reqres.in/api/users`);

    console.log(res.data);
    if (res.data && res.data.data) return res.data.data;
  } catch (error) {
    return [];
  }
};

export const getUserDetails = async userId => {
  try {
    const res = await axios.get(`https://reqres.in/api/users/${userId}`);

    if (res.data && res.data.data) return res.data.data;
  } catch (error) {
    return;
  }
};

export const addNewUser = async newUserData => {
  try {
    const res = await axios.post(`https://reqres.in/api/users`, newUserData);

    if (res.data) return res.data;
  } catch (error) {
    return;
  }
};

export const editUser = async (userId, updatedUserData) => {
  try {
    const res = await axios.post(
      `https://reqres.in/api/users/${userId}`,
      updatedUserData
    );

    if (res.data) return res.data;
  } catch (error) {
    return;
  }
};

export const deleteAUser = async userId => {
  try {
    const res = await axios.delete(`https://reqres.in/api/users/${userId}`);

    if (res.data) return res.data;
  } catch (error) {
    return;
  }
};

export const loginUser = async userDetails => {
  try {
    const res = await axios.post(`https://reqres.in/api/login`, userDetails);

    if (res.data) return res.data;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.error)
      return {
        error: error.response.data.error
      };

    return {
      error: "Some error occured!"
    };
  }
};
