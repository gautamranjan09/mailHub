export function useCurrentUser(user, docData = {}) {
  const createdAtTimeStamp = Number(user.metadata.createdAt);
  const lastLoginAtTimeStamp = Number(user.metadata.lastLoginAt);
  const loggedInUser = {
    displayName: user.displayName,
    email: user.email,
    emailVerified: user.emailVerified,
    phoneNumber: docData?.phoneNumber ? docData?.phoneNumber : null,
    photoURL: user.photoURL,
    token: user.accessToken,
    id: user.uid,
    createdAt: new Date(createdAtTimeStamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
    lastLoginAt: new Date(lastLoginAtTimeStamp).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    }),
  };

  return loggedInUser;
}
