import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import clsx from "clsx";

import EndCallButton from "./EndCallButton";
import ToggleAudioButton from "./ToggleAudioButton";
import ToggleVideoButton from "./ToggleVideoButton";
import ToggleScreenShareButton from "./ToggleScreenShareButton";
import ToggleFullScreenButton from "./ToggleFullScreenButton";
import ToggleHelpButton from "./ToggleHelpButton";
import ToggleGamesButton from "./ToggleGamesButton";

import useIsUserActive from "./useIsUserActive";
import useRoomState from "../../hooks/useRoomState";
import JoinCallButton from "./JoinCallButton";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
      position: "absolute",
      right: "50%",
      transform: "translate(50%, 30px)",
      bottom: "50px",
      zIndex: 1,
      transition: "opacity 1.2s, transform 1.2s, visibility 0s 1.2s",
      opacity: 0,
      visibility: "hidden",
      "&.showControls, &:hover": {
        transition: "opacity 0.6s, transform 0.6s, visibility 0s",
        opacity: 1,
        visibility: "visible",
        transform: "translate(50%, 0px)"
      }
    }
  })
);

export default function Controls() {
  const classes = useStyles();
  const roomState = useRoomState();
  const isReconnecting = roomState === "reconnecting";
  const isUserActive = useIsUserActive();
  const showControls = isUserActive || roomState === "disconnected";

  return (
    <div className={clsx(classes.container, { showControls })}>
      <ToggleHelpButton />
      <ToggleAudioButton disabled={isReconnecting} />
      <ToggleVideoButton disabled={isReconnecting} />
      <ToggleFullScreenButton />
      {roomState !== "disconnected" && (
        <>
          <ToggleScreenShareButton disabled={isReconnecting} />
          <ToggleGamesButton />
          <EndCallButton />
        </>
      )}
      {roomState === "disconnected" && <JoinCallButton />}
    </div>
  );
}
