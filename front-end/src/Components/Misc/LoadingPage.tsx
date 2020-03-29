import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";

declare interface LoadingProps {
  classes: any;
  busyMessage: string;
}

const Loading: React.FunctionComponent<LoadingProps> = ({
  busyMessage,
  classes
}) => {
  return (
    <div className={classes.loadingContainer}>
      <div className={classes.loadingContent}>
        <CircularProgress color="primary" className={classes.loadingCircle} />
        <Typography variant="h3">{busyMessage}</Typography>
      </div>
    </div>
  );
};

export default Loading;
