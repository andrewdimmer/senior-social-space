import { green } from "@material-ui/core/colors";
import Fab from "@material-ui/core/Fab";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";
import CallIcon from "@material-ui/icons/Call";
import React, { Fragment } from "react";
import { CircularProgress } from "@material-ui/core";
import { useAppState } from "../../state";
import useVideoContext from "../../hooks/useVideoContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1),
      backgroundColor: green[500]
    },
    loadingSpinner: {
      marginLeft: "1em",
      color: green[500]
    }
  })
);

export default function JoinCallButton() {
  const classes = useStyles();
  const { user, groupId, getToken, isFetching } = useAppState();
  const { isConnecting, connect } = useVideoContext();

  const handleJoin = () => {
    const userId = user?.displayName
      ? user.displayName
      : user?.email
      ? user.email
      : user?.phoneNumber
      ? user.phoneNumber
      : user?.uid
      ? user.uid
      : "";
    getToken(userId, groupId).then((token: any) => connect(token));
  };

  return (
    <Fragment>
      <Tooltip
        title={"Join Call"}
        onClick={() => {}}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        <Fab
          className={classes.fab}
          onClick={handleJoin}
          disabled={isConnecting || !user || !groupId || isFetching}
        >
          <CallIcon />
        </Fab>
      </Tooltip>
      {(isConnecting || isFetching) && (
        <CircularProgress className={classes.loadingSpinner} />
      )}
    </Fragment>
  );
}
