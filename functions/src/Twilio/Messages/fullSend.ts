import * as functions from "firebase-functions";
import { sendSMS } from "./text";
import { sendWhatsapp } from "./whatsapp";
import { sendEmail } from "./email";

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
  const smsNumber = requestBody.smsNumber;
  const smsText = requestBody.smsText;
  const waNumber = requestBody.waNumber;
  const waText = requestBody.waText;
  const email = requestBody.email;
  const subject = requestBody.subject;
  const body = requestBody.body;

  const senders = [
    sendSMS(smsText, smsNumber),
    sendWhatsapp(waText, waNumber),
    sendEmail(email, subject, body)
  ];
  Promise.all(senders)
    .then(values => {
      if (values[0]) {
        console.log("Sent SMS");
      }
      if (values[1]) {
        console.log("Sent Whatsapp");
      }
      if (values[2]) {
        console.log("Sent Email");
      }
      response.send(true);
    })
    .catch(err => {
      console.log(err);
      response.send(false);
    });
});
