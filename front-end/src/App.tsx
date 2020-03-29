import { Container } from "@material-ui/core";
import React, { Fragment } from "react";
import NavBar from "./Components/Layouts/NavBar";
import NotificationBar, {
  NotificationMessage
} from "./Components/Misc/Notifications";
import { getPageComponent, getPageTitle } from "./Components/Pages";
import { firebaseApp } from "./Scripts/firebaseConfig";
import { styles } from "./Styles";
import Loading from "./Components/Misc/LoadingPage";

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
    </Fragment>
  );
};

export default App;
