import firebase from "firebase/app";
import "firebase/auth";

const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = async () => {
  await firebase
    .auth()
    .signInWithPopup(provider)
    .then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      const credential = result.credential;
      // This gives you a Google Access Token. You can use it to access the Google API.
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(user);
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

  //   await firebase.auth().signInWithRedirect(provider);
  //   await firebase
  //     .auth()
  //     .getRedirectResult()
  //     .then((result) => {
  //       if (result.credential) {
  //         /** @type {firebase.auth.OAuthCredential} */
  //         const credential = result.credential;
  //         // This gives you a Google Access Token. You can use it to access the Google API.
  //         const token = credential.accessToken;
  //         // ...
  //       }
  //       // The signed-in user info.
  //       const user = result.user;
  //       console.log("Google user info: ", user);
  //     })
  //     .catch((error) => {
  //       // Handle Errors here.
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // The email of the user's account used.
  //       const email = error.email;
  //       // The firebase.auth.AuthCredential type that was used.
  //       const credential = error.credential;
  //       // ...
  //     });
};
