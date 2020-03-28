import { Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";

const HomePage: React.FunctionComponent<PageProps> = () => {
  return (
    <Fragment>
      <Typography variant="h1">Home</Typography>
    </Fragment>
  );
};

export default HomePage;
