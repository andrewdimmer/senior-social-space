import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import LoginUi from "../Content/LoginUi";

const LoginPage: React.FunctionComponent<PageProps> = ({
  handleUpdateNotification,
  setPageKey,
  forceReloadUserData,
  setBusyMessage,
  classes
}) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Login</Typography>
      </Container>
      <LoginUi
        allowAnonymousAuth={true}
        handleUpdateNotification={handleUpdateNotification}
        setPageKey={setPageKey}
        forceReloadUserData={forceReloadUserData}
        setBusyMessage={setBusyMessage}
        classes={classes}
      />
    </Fragment>
  );
};

export default LoginPage;
