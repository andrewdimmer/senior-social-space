import { CssBaseline } from "@material-ui/core";
import { MuiThemeProvider } from "@material-ui/core/styles";
import React from "react";
import { ConnectOptions } from "twilio-video";
import App from "./VideoMeeting";
import ErrorDialog from "./components/ErrorDialog/ErrorDialog";
import { VideoProvider } from "./components/VideoProvider";
import AppStateProvider, { useAppState } from "./state";
import theme from "./theme";
import "./types";

// See: https://media.twiliocdn.com/sdk/js/video/releases/2.0.0/docs/global.html#ConnectOptions
// for available connection options.
const connectionOptions: ConnectOptions = {
  bandwidthProfile: {
    video: {
      mode: "collaboration",
      dominantSpeakerPriority: "standard",
      renderDimensions: {
        high: { height: 1080, width: 1920 },
        standard: { height: 720, width: 1280 },
        low: { height: 90, width: 160 }
      }
    }
  },
  dominantSpeaker: true,
  maxAudioBitrate: 12000,
  networkQuality: { local: 1, remote: 1 },
  preferredVideoCodecs: [{ codec: "VP8", simulcast: true }]
};

const VideoApp = () => {
  const { error, setError } = useAppState();

  return (
    <VideoProvider options={connectionOptions} onError={setError}>
      <ErrorDialog dismissError={() => setError(null)} error={error} />
      <App />
    </VideoProvider>
  );
};

export const TwilioVideoRoot = (currentUser: firebase.User | null) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <AppStateProvider currentUser={currentUser}>
      <VideoApp />
    </AppStateProvider>
  </MuiThemeProvider>
);
