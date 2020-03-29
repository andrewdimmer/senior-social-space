import { Typography, Button } from "@material-ui/core";
import React, { Fragment } from "react";
import { PageProps } from ".";
import { sendNotifications } from "../../Scripts/sendNotifications";

const HomePage: React.FunctionComponent<PageProps> = () => {
  return (
    <Fragment>
      <Typography variant="h1">Home</Typography>
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
