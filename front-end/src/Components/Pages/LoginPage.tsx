import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import LoginUi from "../Content/LoginUi";
import { createNewUserDatabaseObjects } from "../../Scripts/firebaseCreateNewUser";

const LoginPage: React.FunctionComponent<PageProps> = ({
  handleUpdateNotification,
  setPageKey,
  forceReloadUserData,
  setBusyMessage,
  classes
}) => {
  const newUserCallback = (authResult: firebase.auth.UserCredential) => {
    if (authResult.user) {
      const user = authResult.user;
      setBusyMessage("Creating Account...");
      createNewUserDatabaseObjects({
        userId: user.uid,
        displayName: user.displayName ? user.displayName : "",
        email: user.email ? user.email : "",
        phone: user.phoneNumber ? user.phoneNumber : "",
        photoUrl: user.photoURL ? user.photoURL : ""
      })
        .then(value => {
          if (value) {
            setPageKey("profile");
            handleUpdateNotification({
              type: "info",
              message:
                "Almost there! Please fill out some more information below to help your friends recognize you.",
              open: true
            });
            forceReloadUserData();
            setBusyMessage("");
          } else {
            handleUpdateNotification({
              type: "error",
              message:
                "Unable to finish creating your account. Please try again later.",
              open: true
            });
            setPageKey("logout");
            setBusyMessage("");
          }
        })
        .catch(err => {
          console.log(err);
          handleUpdateNotification({
            type: "error",
            message:
              "Unable to finish creating your account. Please try again later.",
            open: true
          });
          setPageKey("logout");
          setBusyMessage("");
        });
    } else {
      handleUpdateNotification({
        type: "error",
        message:
          "Unable to finish creating your account. Please try again later.",
        open: true
      });
    }
  };

  const existingUserCallback = (authResult: firebase.auth.UserCredential) => {
    setPageKey("home");
    handleUpdateNotification({
      type: "success",
      message: "Successfully Signed In",
      open: true
    });
    forceReloadUserData();
  };

  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Login</Typography>
      </Container>
      <LoginUi
        allowAnonymousAuth={true}
        newUserCallback={newUserCallback}
        existingUserCallback={existingUserCallback}
        classes={classes}
      />
    </Fragment>
  );
};

export default LoginPage;
