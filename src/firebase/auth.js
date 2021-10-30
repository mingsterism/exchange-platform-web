import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import router from "../router/router";
import { createProfile, deleteProfileDoc } from "./profile";
import {
  getCart,
  getMyPurchase,
  removeFromCart,
  removeMyPurchase,
} from "./cart";
import { deleteProduct, getUserProducts } from "./product";
import { deleteProdImg } from "./storage";

export const login = (email, password) => {
  return firebase.auth().signInWithEmailAndPassword(email, password);
};

export const forgotPassword = (email) => {
  return firebase.auth().sendPasswordResetEmail(email);
};

export const createAcc = (email, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((cred) => {
      console.log(cred.user);
      console.log(cred.user.uid);
      console.log("Created user: ", cred);
      const uid = cred.user.uid;
      //   create an object to store the user data
      const userData = {
        id: uid,
        first_name: "default",
        last_name: "default",
        email: email,
        about: "default",
        address: "default",
        points: Number(0),
      };
      // create user profile with the user data
      createProfile(uid, userData);
      console.log("Created user profile...");
      router.push({ name: "Home" });
      Swal.fire({
        icon: "success",
        title: "Welcome",
        showConfirmButton: false,
        timer: 1500,
      });
    })
    .catch((err) => {
      Swal.fire({
        title: "Uh Oh!",
        text: err,
        icon: "error",
        confirmButtonColor: "#1ea7fd",
      });
    });
};

export const deleteAcc = async () => {
  const user = firebase.auth().currentUser;
  const uid = user.uid;
  const productCollection = await getUserProducts(uid);
  productCollection.forEach(async (doc) => {
    const prodId = doc.id;
    const prodPhotos = doc.photos;
    const folderName = uid + "&" + prodId;
    for (let i = 0; i < prodPhotos.length; i++) {
      const photoLink = prodPhotos[i];
      deleteProdImg(folderName, photoLink);
    }
    const deleteDoc = await deleteProduct(uid, prodId);
  });
  const cartCollection = await getCart(uid);
  cartCollection.forEach(async (doc) => {
    const cartId = doc.id;
    const deleteDoc = await removeFromCart(cartId);
  });
  const purchaseCollection = await getMyPurchase(uid);
  purchaseCollection.forEach(async (doc) => {
    const purchaseId = doc.id;
    const deleteDoc = await removeMyPurchase(purchaseId);
  });
  const deleteProfile = await deleteProfileDoc(uid);
  user.delete().catch((err) => console.log(err));
};
