import ky from "ky";

/**
 * createNewUserDatabaseObjects
 * @description Creates the datebase objects for a new user after account creation.
 * @param userData The data to save to the database.
 * @returns true if there were no errors creating the database object; false otherwise.
 */
export const createNewUserDatabaseObjects = (userData: {
  userId: string;
  displayName: string;
  email: string;
  phone: string;
  photoUrl: string;
}): Promise<boolean> => {
  return ky
    .post(
      "https://us-central1-hoohacks2020-gcp.cloudfunctions.net/create_new_user",
      {
        body: JSON.stringify(userData)
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
