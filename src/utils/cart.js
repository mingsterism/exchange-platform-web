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
  // console.log("Items in cart: ", cartDocs);
  return cartDocs;
};

export const removeFromCart = async(prodId) => {
  const cartCollection = profileCollection.doc(user.uid).collection("cart");
  const removeItem = await cartCollection.doc(prodId).delete()
  // console.log("Successfully remove from cart...");
}

export const addToMyPurchase = (products) => {
  const user = firebase.auth().currentUser;
  const cartCollection = profileCollection.doc(user.uid).collection("cart");
  const purchaseCollection = profileCollection
    .doc(user.uid)
    .collection("My Purchase");
  const prods = products;
  prods.forEach(async (doc) => {
    const currentItem = doc;
    const saveDoc = await purchaseCollection.doc(doc.id).set(doc);
    const delDoc = await cartCollection.doc(doc.id).delete();
  });
  console.log("Successfully checkout and save to my purcahse...");
};

export const getMyPurchase = async () => {
  const purchaseDocs = [];
  const user = firebase.auth().currentUser;
  const purchaseCollection = profileCollection
    .doc(user.uid)
    .collection("My Purchase");
  const getDoc = await purchaseCollection.get();
  getDoc.forEach((docs) => {
    const purchaseDoc = docs.data();
    purchaseDocs.push(purchaseDoc);
  });
  console.log("Successfully read from my purcahse.");
  return purchaseDocs;
};
