import * as functions from "firebase-functions";
import * as twilio from "twilio";

export const sendSMS = (text: string, number: string) => {
  return send_message(text, number)
    .then(result => {
      if (result) {
        return true;
      } else {
        return false;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

const send_message = (text: string, number: string) => {
  const accountSid = functions.config().twilio.accountsid;
  const authToken = functions.config().twilio.authtoken;
  const client = twilio(accountSid, authToken);

  return client.messages
    .create({
      body: text,
      from: "+16182235930",
      to: number
    })
    .then((message: { sid: string }) => {
      return message.sid;
    });
};
