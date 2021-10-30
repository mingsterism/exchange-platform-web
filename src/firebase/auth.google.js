import firebase from "firebase/app";
import "firebase/auth";
import { createProfile, getUserProfileDoc } from "./profile";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then(async (result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      //   console.log(user);
      const uid = user.uid;
      const email = user.email;
      const fullName = user.displayName.split(" ");
      const checkForDoc = await getUserProfileDoc(uid);
      if (checkForDoc === null) {
        console.log("User document does not exist. Creating document now...");
        const userData = {
          id: uid,
          first_name: fullName[0],
          last_name: fullName[1],
          email: email,
          about: "default",
          address: "default",
          points: 0,
        };
        await createProfile(uid, userData);
      } else {
        console.log("User Document exist...");
      }
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
};
