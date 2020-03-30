import React, { Fragment } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import SportsEsportsIcon from "@material-ui/icons/SportsEsports";
import Tooltip from "@material-ui/core/Tooltip";
import {
  Button,
  DialogActions,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  List,
  ListItem,
  ListItemText,
  ListItemIcon
} from "@material-ui/core";

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
    <Fragment>
      <Tooltip
        title={areGamesEnabled ? "Show Games" : "Hide Games"}
        placement="top"
        PopperProps={{ disablePortal: true }}
      >
        <Fab className={classes.fab} onClick={toggleGamesEnabled}>
          <SportsEsportsIcon />
        </Fab>
      </Tooltip>
      <Dialog
        open={areGamesEnabled}
        onClose={toggleGamesEnabled}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Play a Game!</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Click on a game from the list below to start playing!
          </DialogContentText>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Bingo" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Bridge" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SportsEsportsIcon />
              </ListItemIcon>
              <ListItemText primary="Dominoes" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={toggleGamesEnabled} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}
