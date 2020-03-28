import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { firebaseApp } from "../../Scripts/FirebaseConfig";

const LogoutPage: React.FunctionComponent<PageProps> = ({
  handleUpdateNotification,
  setPageKey,
  forceReloadUserData
}) => {
  const handleLogout = () => {
    firebaseApp.auth().signOut();
    handleUpdateNotification({
      type: "success",
      message: "Successfully Signed Out",
      open: true
    });
    setPageKey("home");
    forceReloadUserData();
  };

  return (
    <Fragment>
      <Typography variant="h1">Logout</Typography>
      <Typography variant="body1">
        This will eventually log the user out on load.
      </Typography>
      {setTimeout(handleLogout, 1)}
    </Fragment>
  );
};

export default LogoutPage;
