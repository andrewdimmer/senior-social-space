import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { PageProps } from "../Pages";
import LoginUi from "../Content/LoginUi";
import { createNewUserDatabaseObjects } from "../../Scripts/firebaseCreateNewUser";
import ProfilePage from "../Pages/ProfilePage";

declare interface VideoDialogProps extends PageProps {
  video: boolean;
}

const VideoDialog: React.FunctionComponent<VideoDialogProps> = ({
  currentUser,
  handleUpdateNotification,
  forceReloadUserData,
  setBusyMessage,
  setPageKey,
  video,
  classes
}) => {
  const [profile, setProfile] = React.useState(false);

  const newUserCallback = (authResult: firebase.auth.UserCredential) => {
    if (authResult.user) {
      const user = authResult.user;
      setBusyMessage("Creating Account...");
      createNewUserDatabaseObjects({
        userId: user.uid,
        displayName: user.displayName ? user.displayName : "",
        email: user.email ? user.email : "",
        phone: user.phoneNumber ? user.phoneNumber : "",
        photoUrl: user.photoURL ? user.photoURL : ""
      })
        .then(value => {
          if (value) {
            setProfile(true);
            handleUpdateNotification({
              type: "info",
              message:
                "Almost there! Please fill out some more information below to help your friends recognize you.",
              open: true
            });
            forceReloadUserData();
            setBusyMessage("");
          } else {
            handleUpdateNotification({
              type: "error",
              message:
                "Unable to finish creating your account. Please try again later.",
              open: true
            });
            setPageKey("logout");
            setBusyMessage("");
          }
        })
        .catch(err => {
          console.log(err);
          handleUpdateNotification({
            type: "error",
            message:
              "Unable to finish creating your account. Please try again later.",
            open: true
          });
          setPageKey("logout");
          setBusyMessage("");
        });
    } else {
      handleUpdateNotification({
        type: "error",
        message:
          "Unable to finish creating your account. Please try again later.",
        open: true
      });
    }
  };

  const existingUserCallback = (authResult: firebase.auth.UserCredential) => {
    handleUpdateNotification({
      type: "success",
      message: "Successfully Signed In",
      open: true
    });
    forceReloadUserData();
  };

  return (
    <Dialog
      open={video && (!currentUser || profile)}
      onClose={() => {}}
      aria-labelledby="alert-dialog-title"
    >
      <DialogTitle id="alert-dialog-title">
        {!profile
          ? "Sign In to Join the Group!"
          : "Tell us just a little more (optional)"}
      </DialogTitle>
      <DialogContent>
        {!currentUser && (
          <LoginUi
            classes={classes}
            allowAnonymousAuth={true}
            existingUserCallback={existingUserCallback}
            newUserCallback={newUserCallback}
          />
        )}
        {profile && (
          <ProfilePage
            currentUser={currentUser}
            handleUpdateNotification={handleUpdateNotification}
            setPageKey={setPageKey}
            forceReloadUserData={forceReloadUserData}
            setBusyMessage={setBusyMessage}
            classes={classes}
          />
        )}
      </DialogContent>
      <DialogActions>
        {!profile && (
          <Button
            onClick={() => {
              window.location.href = window.location.href.substring(
                0,
                window.location.href.indexOf("?groupId=")
              );
            }}
            color="primary"
          >
            Don't Join Group
          </Button>
        )}
        {profile && (
          <Button
            onClick={() => {
              setProfile(false);
            }}
            color="primary"
          >
            Ready to Join!
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
export default VideoDialog;
