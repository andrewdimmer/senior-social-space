import * as functions from "firebase-functions";
import { createNewUserDatabaseObjects } from "./Firebase/Database/Users/createNewUser";
import { testInformationMappings } from "./Firebase/Database/Users/testInformationMappings";
import {
  updateDisplayNameDatabase,
  updateEmailDatabase,
  updatePhoneDatabase,
  updatePhotoUrlDatabase
} from "./Firebase/Database/Users/updateUserProfileDatabase";
import { fullSend } from "./Twilio/fullSend";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const full_send = fullSend;

// Create New Users
export const create_new_user = createNewUserDatabaseObjects;

// Update Users
export const update_display_name_database = updateDisplayNameDatabase;
export const update_email_database = updateEmailDatabase;
export const update_phone_database = updatePhoneDatabase;
export const update_photo_url_database = updatePhotoUrlDatabase;

// Unit Tests and Validation
export const test_information_mappings = testInformationMappings;
