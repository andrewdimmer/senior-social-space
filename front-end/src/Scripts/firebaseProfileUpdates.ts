import ky from "ky";

export const updateDisplayNameDatabase = (
  userId: string,
  oldDisplayName: string,
  newDisplayName: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/update_display_name_database",
      {
        body: JSON.stringify({ userId, oldDisplayName, newDisplayName })
      }
    )
    .then(results =>
      results
        .text()
        .then(
          text => text.length === "true".length && text.indexOf("true") === 0
        )
        .catch(err => {
          console.log(err);
          return false;
        })
    )
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const updateEmailDatabase = (
  userId: string,
  oldEmail: string,
  newEmail: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/update_email_database",
      {
        body: JSON.stringify({ userId, oldEmail, newEmail })
      }
    )
    .then(results =>
      results
        .text()
        .then(
          text => text.length === "true".length && text.indexOf("true") === 0
        )
        .catch(err => {
          console.log(err);
          return false;
        })
    )
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const updatePhoneDatabase = (
  userId: string,
  oldPhone: string,
  newPhone: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/update_phone_database",
      {
        body: JSON.stringify({ userId, oldPhone, newPhone })
      }
    )
    .then(results =>
      results
        .text()
        .then(
          text => text.length === "true".length && text.indexOf("true") === 0
        )
        .catch(err => {
          console.log(err);
          return false;
        })
    )
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const updatePhotoUrlDatabase = (
  userId: string,
  oldPhotoUrl: string,
  newPhotoUrl: string
): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/update_photo_url_database",
      {
        body: JSON.stringify({ userId, oldPhotoUrl, newPhotoUrl })
      }
    )
    .then(results =>
      results
        .text()
        .then(
          text => text.length === "true".length && text.indexOf("true") === 0
        )
        .catch(err => {
          console.log(err);
          return false;
        })
    )
    .catch(err => {
      console.log(err);
      return false;
    });
};
