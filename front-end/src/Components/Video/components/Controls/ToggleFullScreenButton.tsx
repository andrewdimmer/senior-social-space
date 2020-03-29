import React from "react";

import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

import useFullScreenToggle from "../../hooks/useFullScreenToggle";
import {
  Fab,
  Tooltip,
  Theme,
  createStyles,
  makeStyles
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    }
  })
);

export default function ToggleFullscreenButton() {
  const classes = useStyles();
  const [isFullScreen, toggleFullScreen] = useFullScreenToggle();

  return (
    <Tooltip
      title={isFullScreen ? "Enter Fullscreen" : "Exit Fullscreen"}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleFullScreen}>
        {isFullScreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </Fab>
    </Tooltip>
  );
}
