import * as sgMail from "@sendgrid/mail";
import * as functions from "firebase-functions";

export const sendEmail = (
  to: string,
  subject: string,
  body: string
) => {
  return send_email(to, subject, body);
};

const send_email = (to: string, subject: string, body: string) => {
  //const sgMail = require("@sendgrid/mail"); //TODO: Remove require
  sgMail.setApiKey(functions.config().sendgrid.apikey);
  const msg = {
    to: to,
    from: "reminders@socialsenior.space",
    subject: subject,
    text: body,
    html: "<p>" + body + "</p>"
  };

  return sgMail
    .send(msg)
    .then((result) => {
      if (result) {
        return false;
      } else {
        return true;
      }
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};
