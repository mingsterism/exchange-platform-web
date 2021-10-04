import { profileCollection } from "./firebase";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

export const addToCart = async (productDetails) => {
  const user = firebase.auth().currentUser;
  const cartCollection = profileCollection.doc(user.uid).collection("cart");
  const addItem = await cartCollection
    .doc(productDetails.id)
    .set(productDetails);
  console.log("Successfully add to cart...");
};

export const getCart = async () => {
  const cartDocs = [];
  const user = firebase.auth().currentUser;
  const cartCollection = profileCollection.doc(user.uid).collection("cart");
  const getDoc = await cartCollection.get();
  getDoc.forEach((docs) => {
    const cartDoc = docs.data();
    cartDocs.push(cartDoc);
  });
  return cartDocs;
};
