import {
  allSuccessful,
  allSuccessfulResponse
} from "../../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../../Helpers/logErrors";
import firebaseApp from "../../firebaseConfig";
import {
  addEmailToUserIdMapping,
  addPhoneToUserIdMapping,
  addUserIdToDisplayNameMapping,
  addUserIdToPhotoUrlMapping,
  removeEmailToUserIdMapping,
  removePhoneToUserIdMapping,
  removeUserIdToDisplayNameMapping,
  removeUserIdToPhotoUrlMapping
} from "./userInformationMappings";
import * as functions from "firebase-functions";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateDisplayNameDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, oldDisplayName, newDisplayName } = JSON.parse(
      request.body
    ) as {
      userId: string;
      oldDisplayName: string;
      newDisplayName: string;
    };

    allSuccessfulResponse(
      [updateDisplayNameDatabaseHelper(userId, oldDisplayName, newDisplayName)],
      response
    );
  }
);

/**
 * updateDisplayNameDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the display name is changed.
 * @param userId The userId of the user that is being updated.
 * @param oldDisplayName The previous display name (used to determine if a mapping needs to be removed).
 * @param newDisplayName The new display name to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateDisplayNameDatabaseHelper = (
  userId: string,
  oldDisplayName: string,
  newDisplayName: string
): Promise<boolean> => {
  const promises = [];

  // Update the display name in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ displayName: newDisplayName })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  // Remove the userId to displayName mapping if a display name is no longer specified
  if (oldDisplayName && !newDisplayName) {
    promises.push(removeUserIdToDisplayNameMapping(userId));
    // Add or update the userId to displayName mapping if a new display name is given
  } else if (newDisplayName) {
    promises.push(addUserIdToDisplayNameMapping(userId, newDisplayName));
  }
  // If both the old and new display names are empty, there are no mappings to update

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updateEmailDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, oldEmail, newEmail } = JSON.parse(request.body) as {
      userId: string;
      oldEmail: string;
      newEmail: string;
    };

    allSuccessfulResponse(
      [updateEmailDatabaseHelper(userId, oldEmail, newEmail)],
      response
    );
  }
);

/**
 * updateEmailDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the email address is changed.
 * @param userId The userId of the user that is being updated.
 * @param oldDisplayName The previous email address (used to determine if a mapping needs to be removed).
 * @param newDisplayName The new email address to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updateEmailDatabaseHelper = (
  userId: string,
  oldEmail: string,
  newEmail: string
): Promise<boolean> => {
  const promises = [];

  // Update the email address in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ email: newEmail })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  // If there was an old email address, remove the mapping to it
  if (oldEmail) {
    promises.push(removeEmailToUserIdMapping(oldEmail));
  }
  // If there is a new email address, create a new mapping for it
  if (newEmail) {
    promises.push(addEmailToUserIdMapping(newEmail, userId));
  }

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updatePhoneDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, oldPhone, newPhone } = JSON.parse(request.body) as {
      userId: string;
      oldPhone: string;
      newPhone: string;
    };

    allSuccessfulResponse(
      [updatePhoneDatabaseHelper(userId, oldPhone, newPhone)],
      response
    );
  }
);

/**
 * updatePhoneDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the phone numner is changed.
 * @param userId The userId of the user that is being updated.
 * @param oldDisplayName The previous phone number (used to determine if a mapping needs to be removed).
 * @param newDisplayName The new phone number to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updatePhoneDatabaseHelper = (
  userId: string,
  oldPhone: string,
  newPhone: string
): Promise<boolean> => {
  const promises = [];

  // Update the phone number in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ phone: newPhone })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  // If there was an old phone number, remove the mapping to it
  if (oldPhone) {
    promises.push(removePhoneToUserIdMapping(oldPhone));
  }
  // If there is a new phone number, create a new mapping for it
  if (newPhone) {
    promises.push(addPhoneToUserIdMapping(newPhone, userId));
  }

  return allSuccessful(promises);
};

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const updatePhotoUrlDatabase = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    const { userId, oldPhotoUrl, newPhotoUrl } = JSON.parse(request.body) as {
      userId: string;
      oldPhotoUrl: string;
      newPhotoUrl: string;
    };

    allSuccessfulResponse(
      [updatePhotoUrlDatabaseHelper(userId, oldPhotoUrl, newPhotoUrl)],
      response
    );
  }
);

/**
 * updatePhotoUrlDatabaseHelper
 * @description Updates the main User Object in the "users" collection, and all mappings in the database when the photoUrl is changed.
 * @param userId The userId of the user that is being updated.
 * @param oldPhotoUrl The previous photoUrl (used to determine if a mapping needs to be removed).
 * @param newPhotoUrl The new photoUrl to set.
 * @returns true if all the updates were made without errors; false otherwise.
 */
const updatePhotoUrlDatabaseHelper = (
  userId: string,
  oldPhotoUrl: string,
  newPhotoUrl: string
): Promise<boolean> => {
  const promises = [];

  // Update the photoUrl in the main User Object in the "users" collection
  promises.push(
    firebaseApp
      .firestore()
      .collection("users")
      .doc(userId)
      .update({ photoUrl: newPhotoUrl })
      .then(() => true)
      .catch(logAndReturnFalse)
  );

  // Remove the userId to photoUrl mapping if a photoUrl is no longer specified
  if (oldPhotoUrl && !newPhotoUrl) {
    promises.push(removeUserIdToPhotoUrlMapping(userId));
    // Add or update the userId to photoUrl mapping if a new photoUrl is given
  } else if (newPhotoUrl) {
    promises.push(addUserIdToPhotoUrlMapping(userId, newPhotoUrl));
  }
  // If both the old and new photoUrls are empty, there are no mappings to update

  return allSuccessful(promises);
};
