import ky from "ky";

export const sendNotifications = (
  smsNumber: string,
  name: string,
  groupName: string,
  link: string,
  waNumber: string,
  email: string
) => {
return ky
      .post(
        "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/full_send",
        {
          body: JSON.stringify({
            smsNumber: smsNumber,
            smsText:
              "You were invited to a call by " +
              name +
              " in " +
              groupName +
              ". Click here to join! " +
              link,
            waNumber: waNumber,
            waText:
              "You were invited to a call by " +
              name +
              " in " +
              groupName +
              ". Click here to join! " +
              link,
            email: "contactandrewd@gmail.com",
            subject:
              "You were invited to a call by " + name + " in " + groupName,
            body:
              "You were invited to a call by " +
              name +
              " in " +
              groupName +
              ". Click here to join! " +
              link
          })
        }
      ).then(() => true).catch(() => false);
    //=> `{data: '🦄'}`
  };
