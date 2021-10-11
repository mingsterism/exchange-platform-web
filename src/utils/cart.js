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

export const getCart = async (uid) => {
  const cartDocs = [];
  // const user = firebase.auth().currentUser;
  const cartCollection = profileCollection.doc(uid).collection("cart");
  const getDoc = await cartCollection.get();
  getDoc.forEach((docs) => {
    const cartDoc = docs.data();
    cartDocs.push(cartDoc);
  });
  // console.log("Items in cart: ", cartDocs);
  return cartDocs;
};

export const removeFromCart = async (prodId) => {
  const user = firebase.auth().currentUser;
  const cartDoc = profileCollection
    .doc(user.uid)
    .collection("cart")
    .doc(prodId);
  // const removeItem = cartCollection.doc(prodId)
  await cartDoc
    .delete()
    .catch((err) => console.log("Error in deleting: ", err));
  // console.log("Successfully remove from cart...");
};

export const addToMyPurchase = (products) => {
  const user = firebase.auth().currentUser;
  const cartCollection = profileCollection.doc(user.uid).collection("cart");
  const purchaseCollection = profileCollection
    .doc(user.uid)
    .collection("My Purchase");
  const prods = products;
  prods.forEach(async (doc) => {
    const currentItem = doc;
    const extProdDocLocation = profileCollection
      .doc(currentItem.soldBy)
      .collection("products")
      .doc(String(currentItem.productId));
    const getExtDoc = await extProdDocLocation.get();
    console.log(getExtDoc);
    if (getExtDoc.exists) {
      const extProdDoc = getExtDoc.data();
      console.log("Read existing product document: ", extProdDoc);
      // * upadting the quanity for the existing product
      const updateDoc = await profileCollection
        .doc(currentItem.soldBy)
        .collection("products")
        .doc(String(currentItem.productId))
        .update({
          quantity: Number(extProdDoc.quantity - doc.desireQuantity),
        });
      // * save item to my purchase
      const saveDoc = await purchaseCollection
        .doc(currentItem.id)
        .set(currentItem);
      // * remove item from cart after check out
      const delDoc = await cartCollection.doc(currentItem.id).delete();
    }
  });
  console.log("Successfully checkout and save to my purcahse...");
};

export const getMyPurchase = async (uid) => {
  const purchaseDocs = [];
  // const user = firebase.auth().currentUser;
  const purchaseCollection = profileCollection
    .doc(uid)
    .collection("My Purchase");
  const getDoc = await purchaseCollection.get();
  getDoc.forEach((docs) => {
    const purchaseDoc = docs.data();
    purchaseDocs.push(purchaseDoc);
  });
  console.log("Successfully read from my purcahse.");
  return purchaseDocs;
};

export const updateTotalPrice = async (qty, newTotal, prodId) => {
  const user = firebase.auth().currentUser;
  const cartCollection = profileCollection
    .doc(user.uid)
    .collection("cart")
    .doc(prodId);
  const updateDoc = await cartCollection.update({
    desireQuantity: qty,
    totalPoints: newTotal,
  });
  console.log("Updated with latest qty and total price...");
};

// export const deleteMyPurchaseAndCart = async (uid) => {
//   const cartCollection = profileCollection.doc(uid).collection("cart");
//   const purchaseCollection = profileCollection
//     .doc(uid)
//     .collection("My Purchase");
//   const getCartDocs = await cartCollection.get();
//   const getPurchaseDocs = await purchaseCollection.get();

//   getCartDocs.forEach((doc) => {
//     const cartDoc = doc.data();
//     const delCartDoc = cartCollection
//       .doc(cartDoc.id)
//       .delete()
//       .catch((err) => console.log(err));
//   });

//   getPurchaseDocs.forEach((doc) => {
//     const purchaseDoc = doc.data();
//     const delPurchaseDoc = purchaseCollection
//       .doc(purchaseDoc.id)
//       .delete()
//       .catch((err) => console.log(err));
//   });

//   console.log(
//     "Successfully delete purchase collection and delete collection..."
//   );
// };

export const removeMyPurchase = async (prodId) => {
  const user = firebase.auth().currentUser;
  const purchaseDoc = profileCollection
    .doc(user.uid)
    .collection("My Purchase")
    .doc(prodId);
  // const removeItem = cartCollection.doc(prodId)
  await purchaseDoc
    .delete()
    .catch((err) => console.log("Error in deleting: ", err));
  // console.log("Successfully remove from cart...");
};
