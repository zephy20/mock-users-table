import React, { useEffect, useState } from "react";
import UserDetailsWrapper from "../../components/UserDetails";
import { useLocation, useHistory } from "react-router-dom";
import { addNewUser, editUser, getUserDetails } from "../../api";
import UserNotFound from "../../components/UserDetails/UserNotFound";
import Spinner from "react-bootstrap/Spinner";
import Alert from "react-bootstrap/Alert";

export default function UserDetailsContainer({ type }) {
  const [userDetails, setUserDetails] = useState(null);
  const [loader, setLoader] = useState(true);
  const [inputErrors, setInputErrors] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(null);
  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    if (type === "edit") {
      (async () => {
        const userId = new URLSearchParams(location.search).get("id");
        if (userId) {
          const userData = await getUserDetails(userId);
          setLoader(false);
          if (userData) setUserDetails(userData);
        }
      })();
    } else {
      const newUser = {
        first_name: "",
        last_name: "",
        email: ""
      };
      setUserDetails(newUser);
    }
  }, []);

  const handleSubmit = async () => {
    const errors = validatedUserDetails();

    if (Object.keys(errors).length) {
      setInputErrors(errors);
      return;
    }
    if (type === "add") {
      const res = await addNewUser(userDetails);

      if (res) {
        setIsSubmitted({ status: "success" });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        setIsSubmitted({ status: "danger" });
      }
    } else {
      const userId = new URLSearchParams(location.search).get("id");

      const res = await editUser(userId, userDetails);

      if (res) {
        setIsSubmitted({ status: "success" });
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        setIsSubmitted({ status: "danger" });
      }
    }
  };

  const validatedUserDetails = () => {
    let errors = {};
    if (!userDetails.first_name)
      errors = {
        first_name: "First Name required"
      };

    if (!userDetails.last_name)
      errors = {
        ...errors,
        last_name: "Last name required"
      };

    if (!userDetails.email)
      errors = {
        ...errors,
        email: "Email required"
      };

    return errors;
  };

  const handleInputChange = (e, inputType) => {
    const updatedUser = {
      ...userDetails,
      [inputType]: e.target.value
    };

    setUserDetails(updatedUser);
  };

  if (userDetails)
    return (
      <>
        {isSubmitted && (
          <Alert variant={isSubmitted.status}>
            {isSubmitted.status === "success"
              ? type === "add"
                ? "User added! Redirecting back to home"
                : "User edited! Redirecting back to home"
              : "Some error occured!"}
          </Alert>
        )}
        <UserDetailsWrapper
          user={userDetails}
          inputErrors={inputErrors}
          type={type}
          handleInputChange={handleInputChange}
          handleSubmit={handleSubmit}
        />
      </>
    );
  if (loader)
    return (
      <div className="topSpacing">
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      </div>
    );
  return <UserNotFound />;
}
