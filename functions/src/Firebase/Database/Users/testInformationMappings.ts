import * as functions from "firebase-functions";
import {
  addEmailToUserIdMapping,
  addPhoneToUserIdMapping,
  addUserIdToDisplayNameMapping,
  addUserIdToPhotoUrlMapping,
  getEmailToUserIdMapping,
  getPhoneToUserIdMapping,
  getUserIdToDisplayNameMapping,
  getUserIdToPhotoUrlMapping,
  removeEmailToUserIdMapping,
  removePhoneToUserIdMapping,
  removeUserIdToDisplayNameMapping,
  removeUserIdToPhotoUrlMapping
} from "./userInformationMappings";
import { allSuccessfulResponce } from "../../../Helpers/allSuccessful";
import { logAndReturnFalse } from "../../../Helpers/logErrors";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const testInformationMappings = functions.https.onRequest(
  (request, response) => {
    allSuccessfulResponce(
      [
        testInformationMappingsEmailToUserId(),
        testInformationMappingsPhoneToUserId(),
        testInformationMappingsUserIdToDisplayName(),
        testInformationMappingsUserIdToPhotoUrl()
      ],
      response,
      "All test cases passed!",
      "One or more test cases failed."
    );
  }
);

/**
 * testInformationMappingsEmailToUserId
 * @description Runs unit tests on all of the basic mapping functions associated with email address and userId.
 * @returns true if all functions worked, false if one or more functions did not.
 */
const testInformationMappingsEmailToUserId = (): Promise<boolean> => {
  const testEmail = "example@example.com";
  const testUserId = "ThisIsAUserId";
  return addEmailToUserIdMapping(testEmail, testUserId)
    .then(() =>
      getEmailToUserIdMapping(testEmail)
        .then(data => {
          if (
            data.email.indexOf(testEmail) === 0 &&
            data.email.length === testEmail.length &&
            data.userId.indexOf(testUserId) === 0 &&
            data.userId.length === testUserId.length
          ) {
            return removeEmailToUserIdMapping(testEmail)
              .then(() =>
                getEmailToUserIdMapping(testEmail)
                  .then(() => false)
                  .catch(logAndReturnFalse)
              )
              .catch(logAndReturnFalse);
          }
          return false;
        })
        .catch(logAndReturnFalse)
    )
    .catch(logAndReturnFalse);
};

/**
 * testInformationMappingsPhoneToUserId
 * @description Runs unit tests on all of the basic mapping functions associated with phone number and userId.
 * @returns true if all functions worked, false if one or more functions did not.
 */
const testInformationMappingsPhoneToUserId = (): Promise<boolean> => {
  const testPhone = "+155555512345";
  const testUserId = "ThisIsAUserId";
  return addPhoneToUserIdMapping(testPhone, testUserId)
    .then(() =>
      getPhoneToUserIdMapping(testPhone)
        .then(data => {
          if (
            data.phone.indexOf(testPhone) === 0 &&
            data.phone.length === testPhone.length &&
            data.userId.indexOf(testUserId) === 0 &&
            data.userId.length === testUserId.length
          ) {
            return removePhoneToUserIdMapping(testPhone)
              .then(() =>
                getPhoneToUserIdMapping(testPhone)
                  .then(() => false)
                  .catch(logAndReturnFalse)
              )
              .catch(logAndReturnFalse);
          }
          return false;
        })
        .catch(logAndReturnFalse)
    )
    .catch(logAndReturnFalse);
};

/**
 * testInformationMappingsUserIdToDisplayName
 * @description Runs unit tests on all of the basic mapping functions associated with userId and display name.
 * @returns true if all functions worked, false if one or more functions did not.
 */
const testInformationMappingsUserIdToDisplayName = (): Promise<boolean> => {
  const testUserId = "ThisIsAUserId";
  const testDisplayName = "User Bob";
  return addUserIdToDisplayNameMapping(testUserId, testDisplayName)
    .then(() =>
      getUserIdToDisplayNameMapping(testUserId)
        .then(data => {
          if (
            data.userId.indexOf(testUserId) === 0 &&
            data.userId.length === testUserId.length &&
            data.displayName.indexOf(testDisplayName) === 0 &&
            data.displayName.length === testDisplayName.length
          ) {
            return removeUserIdToDisplayNameMapping(testUserId)
              .then(() =>
                getUserIdToDisplayNameMapping(testUserId)
                  .then(() => false)
                  .catch(logAndReturnFalse)
              )
              .catch(logAndReturnFalse);
          }
          return false;
        })
        .catch(logAndReturnFalse)
    )
    .catch(logAndReturnFalse);
};

/**
 * testInformationMappingsUserIdToPhotoUrl
 * @description Runs unit tests on all of the basic mapping functions associated with userId and photoUrl.
 * @returns true if all functions worked, false if one or more functions did not.
 */
const testInformationMappingsUserIdToPhotoUrl = (): Promise<boolean> => {
  const testUserId = "ThisIsAUserId";
  const testPhotoUrl = "https://example.com/example.png";
  return addUserIdToPhotoUrlMapping(testUserId, testPhotoUrl)
    .then(() =>
      getUserIdToPhotoUrlMapping(testUserId)
        .then(data => {
          if (
            data.userId.indexOf(testUserId) === 0 &&
            data.userId.length === testUserId.length &&
            data.photoUrl.indexOf(testPhotoUrl) === 0 &&
            data.photoUrl.length === testPhotoUrl.length
          ) {
            return removeUserIdToPhotoUrlMapping(testUserId)
              .then(() =>
                getUserIdToPhotoUrlMapping(testUserId)
                  .then(() => false)
                  .catch(logAndReturnFalse)
              )
              .catch(logAndReturnFalse);
          }
          return false;
        })
        .catch(logAndReturnFalse)
    )
    .catch(logAndReturnFalse);
};
