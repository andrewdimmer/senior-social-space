import MainParticipantInfo from "./MainParticipantInfo";
import ParticipantTracks from "./ParticipantTracks";
import React from "react";
import useMainSpeaker from "../hooks/useMainSpeaker";
import useSelectedParticipant from "./VideoProvider/useSelectedParticipant";
import useScreenShareParticipant from "../hooks/useScreenShareParticipant";

export default function MainParticipant() {
  const mainParticipant = useMainSpeaker();
  const [selectedParticipant] = useSelectedParticipant();
  const screenShareParticipant = useScreenShareParticipant();

  const videoPriority =
    mainParticipant === selectedParticipant ||
    mainParticipant === screenShareParticipant
      ? "high"
      : null;

  return (
    /* audio is disabled for this participant component because this participant's audio 
       is already being rendered in the <ParticipantStrip /> component.  */
    <MainParticipantInfo participant={mainParticipant}>
      <ParticipantTracks
        participant={mainParticipant}
        disableAudio
        enableScreenShare
        videoPriority={videoPriority}
      />
    </MainParticipantInfo>
  );
}
