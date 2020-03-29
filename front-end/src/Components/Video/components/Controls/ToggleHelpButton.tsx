import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    fab: {
      margin: theme.spacing(1)
    }
  })
);

export default function ToggleAudioButton(props: { disabled?: boolean }) {
  const classes = useStyles();
  const [isHelpEnabled, setHelpEnabled] = React.useState(false);

  const toggleHelpEnabled = () => {
    setHelpEnabled(!isHelpEnabled);
  };

  return (
    <Tooltip
      title={isHelpEnabled ? "Turn On Help" : "Turn Off Help"}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleHelpEnabled}>
        <HelpOutlineIcon />
      </Fab>
    </Tooltip>
  );
}
