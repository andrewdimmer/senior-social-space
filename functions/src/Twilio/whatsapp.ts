import * as twilio from "twilio";
import * as functions from "firebase-functions";

export const sendWhatsapp = (text: string, number: string) => {
  return send_whatsapp(text, number)
    .then(result => {
      if (result) {
        return(false);
      } else {
        return(true);
      }
    })
    .catch(err => {
      console.log(err);
      return(false);
    });
};


const send_whatsapp = (text: string, number: string) => {
  const accountSid = functions.config().twilio.accountsid;
  const authToken = functions.config().twilio.authtoken;
  const client = twilio(accountSid, authToken);

  return client.messages
    .create({
      from: "whatsapp:+14155238886",
      body: text,
      to: "whatsapp:" + number,
    })
    .then((message: { sid: any }) => {return(message.sid);});
};
