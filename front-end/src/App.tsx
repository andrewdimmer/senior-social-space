import React, { Fragment } from "react";
import NavBar from "./Components/Layouts/NavBar";
import { getPageTitle, getPageComponent } from "./Components/Pages";
import NotificationBar, {
  NotificationMessage
} from "./Components/Misc/Notifications";
import { firebaseApp } from "./Scripts/FirebaseConfig";
import { styles } from "./Styles";
import { Container } from "@material-ui/core";

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
          console.log(user);
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
          classes={classes}
        />
      </Container>
    </Fragment>
  );
};

export default App;
