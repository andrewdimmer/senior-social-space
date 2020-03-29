import * as functions from "firebase-functions";
import { fullSend } from "./Twilio/fullSend";
import { testInformationMappings } from "./Firebase/Database/Users/testInformationMappings";
import { createNewUserDatabaseObjects } from "./Firebase/Database/Users/createNewUser";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const full_send = fullSend;

// Create New Users
export const create_new_user = createNewUserDatabaseObjects;

// Unit Tests and Validation
export const test_information_mappings = testInformationMappings;
