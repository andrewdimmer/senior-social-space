import * as functions from "firebase-functions";
import { logAndReturnFalse } from "./logErrors";

/**
 * allSuccessful
 * @description Validates that all of the promises given in the input have completed without error.
 * @param promises An array of promises that evaluate to true if they ran without error, and evaluate to false if they encounter an error.
 * @returns true if all promises given ran without error, false if one or more promises had an error.
 */
export const allSuccessful = (
  promises: Promise<boolean>[]
): Promise<boolean> => {
  return Promise.all(promises)
    .then(results => {
      for (const bool in results) {
        if (!bool) {
          return false;
        }
      }
      return true;
    })
    .catch(logAndReturnFalse);
};

/**
 * allSuccessfulResponse
 * @description Validates that all of the promises given in the input have completed without error, and sends the appropriate HTTP response. If a successMessage and/or failureMessage is given, then it will send that/those messages back; otherwise it will send true if all promises ran without encountering any errors and false if one or more promises encountered an error.
 * @param promises An array of promises that evaluate to true if they ran without error, and evaluate to false if they encounter an error.
 * @param response The HTTP response object that will send the success or failure verdict back.
 * @param successMessage The message to send if all promises ran without encountering errors. If no success message is given, then true will be sent back instead.
 * @param failureMessage The message to send if one or more promises encountered an error. If no failure message is given, then false will be sent back instead.
 */
export const allSuccessfulResponce = (
  promises: Promise<boolean>[],
  response: functions.Response<any>,
  successMessage?: string,
  failureMessage?: string
): void => {
  if (allSuccessful(promises)) {
    response.status(200).send(successMessage ? successMessage : true);
  } else {
    response.status(200).send(failureMessage ? failureMessage : false);
  }
};
