/**
 * logAndReturnFalse
 * @description Log an error message and return false; designed for inside of the catch block of promises.
 * @param err The error message that was thrown.
 * @returns false
 */
export const logAndReturnFalse = (err: any): boolean => {
  console.log(err);
  return false;
};
