import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";

const ErrorPage: React.FunctionComponent<PageProps> = () => {
  return (
    <Fragment>
      <Typography variant="h1">Error!</Typography>
      <Typography variant="h2">
        Unable to find the page you are looking for.
      </Typography>
      <Typography variant="body1">
        Unless, of course, you are looking for an error page. In which case,
        great job! You found it!{" "}
      </Typography>
    </Fragment>
  );
};

export default ErrorPage;
