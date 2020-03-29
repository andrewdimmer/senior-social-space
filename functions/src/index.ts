import * as functions from "firebase-functions";
import { fullSend } from "./Twilio/fullSend";
import { testInformationMappings } from "./Firebase/Database/Profile/testInformationMappings";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const full_send = fullSend;

// Unit Tests and Validation
export const test_information_mappings = testInformationMappings;
