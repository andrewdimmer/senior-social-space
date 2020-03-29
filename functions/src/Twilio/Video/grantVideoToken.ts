import * as functions from "firebase-functions";
import { jwt } from "twilio";

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript
export const grantVideoToken = functions.https.onRequest(
  (request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");

    const { userId, groupId } = JSON.parse(request.body) as {
      userId: string;
      groupId: string;
    };

    const token: any = getTwilioAccessToken();
    token.identity = userId;

    const videoGrant = new jwt.AccessToken.VideoGrant({ room: groupId });
    token.addGrant(videoGrant);
    console.log(token);
    response.status(200).send(token.toJwt());
    console.log(`issued token for ${userId} in room ${groupId}`);
  }
);

const getTwilioAccessToken = () => {
  const MAX_ALLOWED_SESSION_DURATION = 14400; // 4 hours max session
  const accountsid: string = functions.config().twilio.accountsid;
  const twilioapikeysid: string = functions.config().twilio.twilioapikeysid;
  const twilioapikeysecret: string = functions.config().twilio
    .twilioapikeysecret;

  return new jwt.AccessToken(accountsid, twilioapikeysid, twilioapikeysecret, {
    ttl: MAX_ALLOWED_SESSION_DURATION
  });
};
