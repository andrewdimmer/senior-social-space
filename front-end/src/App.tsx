import { Container, Fab } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/HelpOutline";
import React, { Fragment } from "react";
import Tour from "reactour";
import NavBar from "./Components/Layouts/NavBar";
import NotificationBar, {
  NotificationMessage
} from "./Components/Misc/Notifications";
import {
  getPageComponent,
  getPageTitle,
  getPageTourSteps
} from "./Components/Pages";
import { firebaseApp } from "./Scripts/FirebaseConfig";
import { styles } from "./Styles";
import Loading from "./Components/Misc/LoadingPage";
import { TwilioVideoRoot } from "./Components/Video";
import VideoDialog from "./Components/Layouts/VideoDialog";

const App: React.FunctionComponent = () => {
  const [currentUser, setCurrentUser] = React.useState<firebase.User | null>(
    null
  );
  const [pageKey, setPageKey] = React.useState<string>("home");
  const [notification, setNotification] = React.useState<NotificationMessage>({
    type: "info",
    message: "",
    open: false
  });
  const [reloadUserData, setReloadUserData] = React.useState<boolean>(true);
  const [isTourOpen, setTourOpen] = React.useState<boolean>(false);
  const [busyMessage, setBusyMessage] = React.useState<string>("");

  const handleChangePage = (pageKey: string) => {
    setPageKey(pageKey);
  };

  const handleUpdateNotification = (
    notificationMessage: NotificationMessage
  ) => {
    setNotification(notificationMessage);
  };

  const forceReloadUserData = () => {
    setReloadUserData(true);
  };

  const loadUserData = () => {
    if (reloadUserData) {
      const oneTimeLoadListener = firebaseApp
        .auth()
        .onAuthStateChanged(user => {
          setCurrentUser(user);
          oneTimeLoadListener(); // Removes the listener after it runs
        });
      setReloadUserData(false);
    }
  };

  loadUserData();

  const classes = styles();
  const PageContent = getPageComponent(pageKey);

  return (
    <Fragment>
      {busyMessage && <Loading busyMessage={busyMessage} classes={classes} />}
      {window.location.href.indexOf("?groupId=") > 0 &&
        TwilioVideoRoot(currentUser)}
      <VideoDialog
        video={window.location.href.indexOf("?groupId=") > 0}
        currentUser={currentUser}
        handleUpdateNotification={handleUpdateNotification}
        setPageKey={setPageKey}
        forceReloadUserData={forceReloadUserData}
        setBusyMessage={setBusyMessage}
        classes={classes}
      />
      {window.location.href.indexOf("?groupId=") < 0 && (
        <Fragment>
          <NavBar
            currentUser={currentUser}
            pageTitle={getPageTitle(pageKey)}
            handleChangePage={handleChangePage}
            classes={classes}
          />
          <NotificationBar
            type={notification.type}
            message={notification.message}
            open={notification.open}
            update={handleUpdateNotification}
          />
          <Container>
            <PageContent
              currentUser={currentUser}
              handleUpdateNotification={handleUpdateNotification}
              setPageKey={setPageKey}
              forceReloadUserData={forceReloadUserData}
              setBusyMessage={setBusyMessage}
              classes={classes}
            />
          </Container>
          <Fab
        style={{
          position: "fixed",
          bottom: "5vh",
          right: "5vw"
        }}
        color="secondary"
        aria-label="add"
        onClick={() => {
          console.log(getPageTourSteps(pageKey));
          if (getPageTourSteps(pageKey).length > 1) {
            setTourOpen(true);
          }
        }}
      >
        <HelpIcon />
      </Fab>
      <Tour
        steps={getPageTourSteps(pageKey)}
        isOpen={isTourOpen}
        onRequestClose={() => {
          setTourOpen(false);
        }}
        disableInteraction={false}
      />
        </Fragment>
      )}
    </Fragment>
  );
};

export default App;
