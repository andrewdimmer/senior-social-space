import firebaseApp from "../../firebaseConfig";

/**
 * ----------------------------------------
 * General Configuration
 * ----------------------------------------
 */
const mappingsDocument = firebaseApp
  .firestore()
  .collection("mappings")
  .doc("MAPPINGS");
const emailToUserIdMappings = mappingsDocument.collection("emailToUserId");
const phoneToUserIdMappings = mappingsDocument.collection("phoneToUserId");
const userIdToDisplayNameMappings = mappingsDocument.collection(
  "userIdToDisplayName"
);
const userIdToPhotoUrlMappings = mappingsDocument.collection(
  "userIdToPhotoUrl"
);

/**
 * ----------------------------------------
 * Use Mappings
 * ----------------------------------------
 */

/**
 * getEmailToUserIdMapping
 * @description Gets the userId associated with a given user email address.
 * @param email The email address to query with.
 * @returns The userId associated with the provided email address in the form {email: string, userId: string}.
 */
export const getEmailToUserIdMapping = (
  email: string
): Promise<firebase.firestore.DocumentData> => {
  return emailToUserIdMappings
    .doc(email)
    .get()
    .then(mappingDoc => {
      const data = mappingDoc.data();
      if (data) {
        return data;
      } else {
        throw new Error(`${email} exists in "emailToUserId" but has no data`);
      }
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Error getting ${email} in "emailToUserId"`);
    });
};

/**
 * getPhoneToUserIdMapping
 * @description Gets the userId associated with a given user phone number.
 * @param phone The phone number to query with.
 * @returns The userId associated with the provided phone number in the form {phone: string, userId: string}.
 */
export const getPhoneToUserIdMapping = (
  phone: string
): Promise<firebase.firestore.DocumentData> => {
  return phoneToUserIdMappings
    .doc(phone)
    .get()
    .then(mappingDoc => {
      const data = mappingDoc.data();
      if (data) {
        return data;
      } else {
        throw new Error(`${phone} exists in "phoneToUserId" but has no data`);
      }
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Error getting ${phone} in "phoneToUserId"`);
    });
};

/**
 * getUserIdToDisplayNameMapping
 * @description Gets the display name associated with a given userId.
 * @param userId The userId to query with.
 * @returns The display name associated with the provided userId in the form {userId: string, displayName: string}.
 */
export const getUserIdToDisplayNameMapping = (
  userId: string
): Promise<firebase.firestore.DocumentData> => {
  return userIdToDisplayNameMappings
    .doc(userId)
    .get()
    .then(mappingDoc => {
      const data = mappingDoc.data();
      if (data) {
        return data;
      } else {
        throw new Error(
          `${userId} exists in "userIdToDisplayName" but has no data`
        );
      }
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Error getting ${userId} in "userIdToDisplayName"`);
    });
};

/**
 * getUserIdToPhotoUrlMapping
 * @description Gets the photoUrl associated with a given userId.
 * @param userId The userId to query with.
 * @returns The photoUrl associated with the provided userId in the form {userId: string, photoUrl: string}.
 */
export const getUserIdToPhotoUrlMapping = (
  userId: string
): Promise<firebase.firestore.DocumentData> => {
  return userIdToPhotoUrlMappings
    .doc(userId)
    .get()
    .then(mappingDoc => {
      const data = mappingDoc.data();
      if (data) {
        return data;
      } else {
        throw new Error(
          `${userId} exists in "userIdToPhotoUrl" but has no data`
        );
      }
    })
    .catch(err => {
      console.log(err);
      throw new Error(`Error getting ${userId} in "userIdToPhotoUrl"`);
    });
};

/**
 * ----------------------------------------
 * Add Mappings
 * ----------------------------------------
 */

/**
 * addEmailToUserIdMapping
 * @description Adds a new mapping between the given email address and userId.
 * @param email The email address to add a mapping for.
 * @param userId The userId to be associated with the the provided email address.
 * @returns true if there where no errors while adding the new mapping; false otherwise.
 */
export const addEmailToUserIdMapping = (
  email: string,
  userId: string
): Promise<boolean> => {
  return emailToUserIdMappings
    .doc(email)
    .set({ email, userId })
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error adding mapping between ${email} and ${userId} in "emailToUserId"`
      );
    });
};

/**
 * addPhoneToUserIdMapping
 * @description Adds a new mapping between the given phone number and userId.
 * @param phone The phone number to add a mapping for.
 * @param userId The userId to be associated with the the provided phone number.
 * @returns true if there where no errors while adding the new mapping; false otherwise.
 */
export const addPhoneToUserIdMapping = (
  phone: string,
  userId: string
): Promise<boolean> => {
  return phoneToUserIdMappings
    .doc(phone)
    .set({ phone, userId })
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error adding mapping between ${phone} and ${userId} in "phoneToUserId"`
      );
    });
};

/**
 * addUserIdToDisplayNameMapping
 * @description Adds a new mapping between the given userId and display name.
 * @param userId The userId to add a mapping for.
 * @param displayName The display name to be associated with the the provided userId.
 * @returns true if there where no errors while adding the new mapping; false otherwise.
 */
export const addUserIdToDisplayNameMapping = (
  userId: string,
  displayName: string
): Promise<boolean> => {
  return userIdToDisplayNameMappings
    .doc(userId)
    .set({ userId, displayName })
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error adding mapping between ${userId} and ${displayName} in "userIdToDisplayName"`
      );
    });
};

/**
 * addUserIdToPhotoUrlMapping
 * @description Adds a new mapping between the given userId and photoUrl.
 * @param userId The userId to add a mapping for.
 * @param photoUrl The photoUrl to be associated with the the provided userId.
 * @returns true if there where no errors while adding the new mapping; false otherwise.
 */
export const addUserIdToPhotoUrlMapping = (
  userId: string,
  photoUrl: string
): Promise<boolean> => {
  return userIdToPhotoUrlMappings
    .doc(userId)
    .set({ userId, photoUrl })
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error adding mapping between ${userId} and ${photoUrl} in "userIdToPhotoUrl"`
      );
    });
};

/**
 * ----------------------------------------
 * Remove Mappings
 * ----------------------------------------
 */

/**
 * removeEmailToUserIdMapping
 * @description Removes the mapping associated with the given email address.
 * @param email The email address to remove the mapping for.
 * @returns true if there where no errors while removing the mapping; false otherwise.
 */
export const removeEmailToUserIdMapping = (email: string): Promise<boolean> => {
  return emailToUserIdMappings
    .doc(email)
    .delete()
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error removing the mapping associated with ${email} in "emailToUserId"`
      );
    });
};

/**
 * removePhoneToUserIdMapping
 * @description Removes the mapping associated with the given phone number.
 * @param phone The phone number to remove the mapping for.
 * @returns true if there where no errors while removing the mapping; false otherwise.
 */
export const removePhoneToUserIdMapping = (phone: string): Promise<boolean> => {
  return phoneToUserIdMappings
    .doc(phone)
    .delete()
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error removing the mapping associated with ${phone} in "phoneToUserId"`
      );
    });
};

/**
 * removeUserIdToDisplayNameMapping
 * @description Removes the mapping associated with the given userId.
 * @param userId The userId to remove the mapping for.
 * @returns true if there where no errors while removing the mapping; false otherwise.
 */
export const removeUserIdToDisplayNameMapping = (
  userId: string
): Promise<boolean> => {
  return userIdToDisplayNameMappings
    .doc(userId)
    .delete()
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error removing the mapping associated with ${userId} in "userIdToDisplayName"`
      );
    });
};

/**
 * removeUserIdToPhotoUrlMapping
 * @description Removes the mapping associated with the given userId.
 * @param userId The userId to remove the mapping for.
 * @returns true if there where no errors while removing the mapping; false otherwise.
 */
export const removeUserIdToPhotoUrlMapping = (
  userId: string
): Promise<boolean> => {
  return userIdToPhotoUrlMappings
    .doc(userId)
    .delete()
    .then(() => true)
    .catch(err => {
      console.log(err);
      throw new Error(
        `Error removing the mapping associated with ${userId} in "userIdToPhotoUrl"`
      );
    });
};
