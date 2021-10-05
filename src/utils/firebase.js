import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/firebase-storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_APP_FIREBASE_API_KEY,
  authDomain:
    import.meta.env.VITE_APP_FIREBASE_AUTH_DOMAIN + ".firebaseapp.com",
  projectId: import.meta.env.VITE_APP_FIREBASE_PROJECT_ID,
  storageBucket:
    import.meta.env.VITE_APP_FIREBASE_STORAGE_BUCKET + ".appspot.com",
  messagingSenderId: import.meta.env.VITE_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_APP_FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore(); //initate firestore connection

export const profileCollection = db.collection("userProfile");

// Get a reference to the storage service, which is used to create references in your storage bucket
export const storageRef = firebase.storage().ref(); // Points to root reference

export const getUserProducts = async () => {
  const user = firebase.auth().currentUser;
  const listOfDocument = profileCollection.doc(user.uid).collection("products");
  const getList = await listOfDocument.get();
  // const snapshot = getList.docs;
  const docContainer = [];
  if (getList !== null) {
    getList.forEach((docs) => {
      const product = docs.data();
      // console.log(product);
      docContainer.push(product);
    });
  }
  return docContainer;
};

export const getSpecificProduct = async (prodID) => {
  const user = firebase.auth().currentUser;
  const productDoc = await profileCollection
    .doc(user.uid)
    .collection("products")
    .doc(prodID)
    .get();
  const productData = productDoc.data();
  console.log(productData);
  console.log("Product name: ", productData.name);
  return productData;
};

export const getOtherUserProduct = async (prodUserId, prodID) => {
  const user = firebase.auth().currentUser;
  const productDoc = await profileCollection
    .doc(prodUserId)
    .collection("products")
    .doc(prodID)
    .get();
  const productData = productDoc.data();
  console.log(productData);
  console.log("Product name: ", productData.name);
  return productData;
};

// export const getUserProducts = async (userId) => {
//   return await profileCollection
//     .doc(userId)
//     .collection("products")
//     .get().then((snapshot) => {
//     console.log(snapshot.docs);
//     const listOfProducts = snapshot.docs;
//     listOfProducts.forEach((docs) => {
//       const list = docs.data();
//       console.log(list);
//     })
//   })
//    return products.data();
// };

export const createProfile = (userId, userInfo) => {
  return profileCollection.doc(userId).set(userInfo);
};

// currently this function grabs the entire list of document in userProfile collection
export const getUserProfile = async () => {
  return await profileCollection.get().then((snapshot) => {
    console.log(snapshot.docs);
    const listOfDocs = snapshot.docs;
    listOfDocs.forEach((docs) => {
      const list = docs.data();
      console.log(list);
    });
  });
};

// this function grabs the user documents by matching the user email.
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

export const createProduct = async (productId, productDetails) => {
  const user = firebase.auth().currentUser;
  // console.log("in createProduct: ", user.uid);
  await profileCollection
    .doc(user.uid) // with the ID from the root collection
    .collection("products") // access to the subcollection
    .doc(productId)
    .set(productDetails); // add data into the subcollection with an autogenerated ID
  return console.log(
    profileCollection.doc(user.uid).collection("products").doc(productId).get()
  );
};

export const deleteProduct = async (productId) => {
  const user = firebase.auth().currentUser;
  const getProduct = profileCollection
    .doc(user.uid)
    .collection("products")
    .doc(productId);
  // console.log(getProduct.id);
  await getProduct.delete();
  if (getProduct !== "") {
    console.log("sucessfully delete product: ", getProduct);
  } else {
    console.log("Could not delete the product!");
  }
};

// export const currentUser = () => {
//   let userId
//   firebase.auth().onAuthStateChanged((user) => {
//     if (user) {
//       // User is signed in, see docs for a list of available properties
//       // https://firebase.google.com/docs/reference/js/firebase.User
//       console.log("User is logged in.");
//       let uid = user.uid;
//       console.log(uid);
//       return userId = uid
//       // return uid;
//     } else {
//       console.log("User is logged out.");
//     }
//   });
//   log
//   return userId
// };

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const forgotPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const getAllUserProducts = async () => {
  const user = firebase.auth().currentUser;
  // const user = firebase.auth().currentUser
  // console.log("user uid is ", user.uid);
  const allUser = await profileCollection.get();
  // console.log(allUser);
  const userContainer = [];
  const productDocContainer = [];
  if (allUser.length !== 0) {
    allUser.forEach((docs) => {
      const userProfile = docs.data();
      // console.log(userProfile);
      userContainer.push(userProfile);
    });
  } else {
    console.log("failed to access products...");
    return;
  }
  // console.log("user available are ", userContainer);

  let i = 0;
  while (i < userContainer.length) {
    let userId = userContainer[i].id;
    // console.log("Current user ID is ", userId);
    if (userId !== user.uid) {
      let userProducts;
      userProducts = await profileCollection
        .doc(userId)
        .collection("products")
        .get();
      // console.log(`Current id is ${userId} with products of ${userProducts.docs}`);
      if (userProducts.length === 0) {
        i++;
        return;
      }
      // console.log(userId + " has these products " + userProducts.docs);
      userProducts.forEach((docs) => {
        const product = docs.data();
        productDocContainer.push(product);
      });
    }
    i++;
  }
  // console.log(productDocContainer);
  console.log("Successfully retrieve all other user products...");
  return productDocContainer;
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

export const updateProductDoc = async (
  newProductName,
  newProductPoints,
  newProductQty,
  newProductConditions,
  newProductDescription,
  prodId
) => {
  const user = firebase.auth().currentUser;
  const productDocument = profileCollection
    .doc(user.uid)
    .collection("products")
    .doc(prodId);
  return productDocument.update({
    name: newProductName,
    points: newProductPoints,
    quantity: newProductQty,
    conditions: newProductConditions,
    description: newProductDescription,
  });
};

export const updateProductPhotos = async (productPhotos, prodId) => {
  const user = firebase.auth().currentUser;
  const productDocument = profileCollection
    .doc(user.uid)
    .collection("products")
    .doc(prodId);
  return productDocument.update({
    photos: productPhotos,
  });
};
