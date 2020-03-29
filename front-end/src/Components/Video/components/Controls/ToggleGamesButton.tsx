import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
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
  const [areGamesEnabled, setAreGamesEnabled] = React.useState(false);

  const toggleGamesEnabled = () => {
    setAreGamesEnabled(!areGamesEnabled);
  };

  return (
    <Tooltip
      title={areGamesEnabled ? "Show Games" : "Hide Games"}
      placement="top"
      PopperProps={{ disablePortal: true }}
    >
      <Fab className={classes.fab} onClick={toggleGamesEnabled}>
        <SportsEsportsIcon />
      </Fab>
    </Tooltip>
  );
}
