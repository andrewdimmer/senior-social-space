import firebase from "firebase";
import * as firebaseui from "firebaseui";
import React, { Fragment } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import { firebaseApp } from "../../Scripts/FirebaseConfig";
import { signInSuccessWithAuthResultFactory } from "../../Scripts/FirebaseAuth";
import { NotificationMessage } from "../Misc/Notifications";

declare interface LoginUiProps {
  allowAnonymousAuth: boolean;
  handleUpdateNotification: (notificationMessage: NotificationMessage) => void;
  setPageKey: (pageKey: string) => void;
  forceReloadUserData: () => void;
  classes: any;
}

const LoginUi: React.FunctionComponent<LoginUiProps> = ({
  allowAnonymousAuth,
  handleUpdateNotification,
  setPageKey,
  forceReloadUserData
}) => {
  const signInOptions = (allowAnonymousAuth: boolean): any[] => {
    if (allowAnonymousAuth) {
      const signInOptionsArray = defaultSignInOptions as any[];
      signInOptionsArray.push({
        provider: firebaseui.auth.AnonymousAuthProvider.PROVIDER_ID
      });
      return signInOptionsArray;
    }
    return defaultSignInOptions;
  };

  const defaultSignInOptions = [
    {
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      requireDisplayName: false
    },
    {
      provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      recaptchaParameters: {
        type: "image", // 'audio'
        size: "invisible", // 'normal' or 'compact'
        badge: "bottomleft" //' bottomright' or 'inline' applies to invisible.
      }
    }
  ];

  const newUserCallback = (authResult: firebase.auth.UserCredential) => {
    setPageKey("profile");
    handleUpdateNotification({
      type: "info",
      message:
        "Almost there! Please fill out some more information below to help your friends recognize you.",
      open: true
    });
    forceReloadUserData();
  };

  const existingUserCallback = (authResult: firebase.auth.UserCredential) => {
    setPageKey("home");
    handleUpdateNotification({
      type: "success",
      message: "Successfully Signed In",
      open: true
    });
    forceReloadUserData();
  };

  const signInSuccessWithAuthResult = signInSuccessWithAuthResultFactory(
    newUserCallback,
    existingUserCallback
  );

  const uiConfig: firebaseui.auth.Config = {
    callbacks: {
      signInSuccessWithAuthResult
    },
    credentialHelper: firebaseui.auth.CredentialHelper.NONE,
    signInOptions: signInOptions(allowAnonymousAuth),
    signInSuccessUrl: window.location.href
  };

  return (
    <Fragment>
      <div>
        <StyledFirebaseAuth
          uiConfig={uiConfig}
          firebaseAuth={firebaseApp.auth()}
        />
      </div>
    </Fragment>
  );
};

export default LoginUi;
