import "firebase/firestore";
import { profileCollection } from "./firebase";

export const createProfile = (userId, userInfo) => {
  profileCollection
    .doc(userId)
    .set(userInfo)
    .then(() => {
      console.log("Sucessfully create acc...");
    })
    .catch((err) => {
      console.log(err);
    });
};

// this function grabs the user documents by finding their uid.
export const getUserProfileDoc = async (uid) => {
  // const user = firebase.auth().currentUser;
  // console.log("User is ", user);
  const userDoc = profileCollection.doc(uid);
  const getDoc = await userDoc.get();
  // console.log(getDoc);
  if (!getDoc.exists) {
    console.log("No such document!");
    return null;
  } else {
    // console.log("Document data:", getDoc.data());
    const data = getDoc.data();
    return data;
  }
};

export const updateUserProfile = async (newDetails, uid) => {
  const userProfile = profileCollection.doc(uid);
  console.log("Accessing profile document");
  // console.log("user is: ", userProfile);
  const updating = await userProfile.update({
    first_name: newDetails.first_name,
    last_name: newDetails.last_name,
    about: newDetails.about,
    address: newDetails.address,
  });
  console.log("Update in progress...");
  // if (updating !== null) {
  //   console.log("Update in progress");
  // } else {
  //   console.log("Update failed...");
  // }
  return updating;
};

export const updateWallet = async (uid, amount) => {
  let newAmount = 0;
  let docData;
  const userProfile = profileCollection.doc(uid);
  const readProfile = await userProfile.get();
  if (readProfile.exists) {
    docData = readProfile.data();
  } else {
    console.log("Document doesn't exist");
  }
  if (amount > 0) {
    newAmount = Number(docData.points + amount);
  } else {
    newAmount = Number(docData.points - (-amount));
  }
  const updateAmount = userProfile
    .update({
      points: newAmount,
    })
    .then(() => {
      console.log("Successfully update wallet...");
    })
    .catch((err) => {
      console.log(err);
    });
};

export const deleteProfileDoc = async (uid) => {
  profileCollection
    .doc(uid)
    .delete()
    .then(() => {
      console.log("Successfully delete profile doc...");
    })
    .catch((err) => {
      console.log(err);
    });
};
