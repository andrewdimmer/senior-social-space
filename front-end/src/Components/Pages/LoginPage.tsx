import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import LoginUi from "../Content/LoginUi";

const LoginPage: React.FunctionComponent<PageProps> = ({
  handleUpdateNotification,
  setPageKey,
  forceReloadUserData,
  classes
}) => {
  return (
    <Fragment>
      <Typography variant="h1">Login</Typography>
      <LoginUi
        allowAnonymousAuth={false}
        handleUpdateNotification={handleUpdateNotification}
        setPageKey={setPageKey}
        forceReloadUserData={forceReloadUserData}
        classes={classes}
      />
    </Fragment>
  );
};

export default LoginPage;
