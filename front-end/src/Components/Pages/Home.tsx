import { Button, Container, Typography } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { sendNotifications } from "../../Scripts/sendNotifications";

const HomePage: React.FunctionComponent<PageProps> = ({ classes }) => {
  return (
    <Fragment>
      <Container className={classes.pageTitle}>
        <Typography variant="h3">Home</Typography>
      </Container>
      <Button
        onClick={() => {
          sendNotifications(
            "+12487785258",
            "Nathan",
            "WooHacks",
            "[link here]",
            "+12487785258",
            "contactandrewd@gmail.com"
          );
        }}
      >
        Send test
      </Button>
    </Fragment>
  );
};

export default HomePage;
