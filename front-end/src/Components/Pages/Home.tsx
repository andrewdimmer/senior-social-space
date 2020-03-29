import { Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";

const HomePage: React.FunctionComponent<PageProps> = ({ classes }) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Home</Typography>
      </Container>
    </Fragment>
  );
};

export default HomePage;
