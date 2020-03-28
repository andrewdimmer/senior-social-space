import { firebaseApp } from "./FirebaseConfig";

export const signInSuccessWithAuthResultFactory = (
  newUserCallback: (authResult: firebase.auth.UserCredential) => any,
  existingUserCallback: (authResult: firebase.auth.UserCredential) => any
): ((
  authResult: firebase.auth.UserCredential,
  redirectUrl: string
) => boolean) => {
  return (
    authResult: firebase.auth.UserCredential,
    redirectUrl: string
  ): boolean => {
    if (authResult.additionalUserInfo?.isNewUser) {
      // Profile Creation
      newUserCallback(authResult);
    } else {
      // Login Successful
      existingUserCallback(authResult);
    }
    console.log(firebaseApp.auth().currentUser);
    return false;
  };
};
