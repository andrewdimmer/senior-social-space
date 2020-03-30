import * as functions from "firebase-functions";
import { sendSMS } from "./text";
import { sendWhatsapp } from "./whatsapp";
import { sendEmail } from "./email";
import { allSuccessfulResponse } from "../../Helpers/allSuccessful";

export const fullSend = functions.https.onRequest((request, response) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
  const requestBody = JSON.parse(request.body) as {
    smsNumber: string;
    smsText: string;
    waNumber: string;
    waText: string;
    email: string;
    subject: string;
    body: string;
  };
  const smsNumbers = requestBody.smsNumber.split(",");
  const smsText = requestBody.smsText;
  const waNumbers = requestBody.waNumber.split(",");
  const waText = requestBody.waText;
  const emails = requestBody.email.split(",");
  const subject = requestBody.subject;
  const body = requestBody.body;

  const promises = [];
  for (const phone in smsNumbers) {
    promises.push(sendSMS(smsText, phone.trim()));
  }
  for (const app in waNumbers) {
    promises.push(sendWhatsapp(waText, app.trim()));
  }
  for (const email in emails) {
    promises.push(sendEmail(email.trim(), subject, body));
  }
  allSuccessfulResponse(promises, response);
});
