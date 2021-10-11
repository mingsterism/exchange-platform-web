import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { profileCollection } from "../utils/firebase";
import { updateWallet } from "../utils/profile";
import {
  addToMyPurchase,
  getCart,
  getMyPurchase,
  removeFromCart,
} from "../utils/cart";
import { userProfile } from "./user.profile";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import router from "../router/router";

// useStore could be anything like useUser, useCart
export const usersStore = defineStore({
  // unique id of the store across your application
  id: Math.random(),
  state() {
    return {
      allProducts: [],
      isLoading: true,
      productId: "",
      productName: null,
      productPoints: null,
      productQuantity: null,
      productPhotos: null,
      photoQty: null,
      productDescriptions: null,
      productCondition: null,
      itemsInCart: null,
      currentTotalPrice: null,
      myPurchases: null,
      hasPurchase: false,
      soldBy: null,
    };
  },
  getters: {
    getAllProducts: (state) => {
      return state.allProducts;
    },
    getProductName: (state) => {
      return state.productName;
    },
    getProductPoints: (state) => {
      return state.productPoints;
    },
    getProductQuantity: (state) => {
      return state.productQuantity;
    },
    getProductPhotos: (state) => {
      return state.productPhotos;
    },
    getProductDescriptions: (state) => {
      return state.productDescriptions;
    },
    getProductCondition: (state) => {
      return state.productCondition;
    },
    getItemsInCart: (state) => {
      return state.itemsInCart;
    },
    getCurrentTotal: (state) => {
      return state.currentTotalPrice;
    },
    getMyPurchase: (state) => {
      return state.myPurchases;
    },
    getHasPurchase: (state) => {
      return state.hasPurchase;
    },
    getProductId: (state) => {
      return state.productId;
    },
    getSoldBy: (state) => {
      return state.soldBy;
    },
    getLoading: (state) => {
      return state.isLoading;
    },
  },
  actions: {
    async displayAllProducts(uid) {
      // console.log("fetching all products...");
      this.isLoading = true;
      const userDocContainer = [];
      this.allProducts = [];
      const otherUsers = await profileCollection.where("id", "!=", uid).get();
      console.log("in progress...");
      if (otherUsers.length !== 0) {
        otherUsers.forEach((doc) => {
          const profileDoc = doc.data();
          userDocContainer.push(profileDoc);
        });
      } else {
        console.log("Failed to read other user document...");
      }

      for (let i = 0; i < userDocContainer.length; i++) {
        const userId = userDocContainer[i].id;
        let userProducts = await profileCollection
          .doc(userId)
          .collection("products")
          .get();
        userProducts.forEach((docs) => {
          const product = docs.data();
          this.allProducts.push(product);
        });
      }
      this.isLoading = false;
      console.log("Successfully fetched all products...");
    },
    async showItemsInCart(uid) {
      let grandTotal = 0;
      const getDocs = await getCart(uid);
      this.setItemsInCart(getDocs);
      for (let i = 0; i < getDocs.length; i++) {
        const itemPrice = getDocs[i].totalPoints;
        grandTotal += itemPrice;
      }
      this.setCurrentTotal(grandTotal);
    },
    async updateTotalCost() {
      const user = firebase.auth().currentUser;
      let grandTotal = 0;
      const getDocs = await getCart(user.uid);
      // this.setItemsInCart(getDocs);
      for (let i = 0; i < getDocs.length; i++) {
        const itemPrice = getDocs[i].totalPoints;
        grandTotal += itemPrice;
      }
      this.setCurrentTotal(grandTotal);
    },
    checkOutItems() {
      const profile = userProfile();
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const currentWalletAmount = profile.wallet;
      // console.log(`${currentWalletAmount} vs ${this.currentTotalPrice}`);
      if (currentWalletAmount < this.currentTotalPrice) {
        // console.log("not enough points...");
        return Swal.fire({
          title: "Oh No!",
          icon: "error",
          text: "You don't have enough points. Please top up to continue.",
          confirmButtonColor: "#1ea7fd",
        });
      }

      // console.log("items in cart: ", this.itemsInCart);
      const deduction = -this.currentTotalPrice;
      updateWallet(uid, deduction);
      addToMyPurchase(this.itemsInCart);
      router.push("/user/my-purchase");
      return Swal.fire(
        "Thank you for purchasing in Exchange Platform!",
        "",
        "success"
      );
    },
    async getMyPurchasedItems(uid) {
      const docs = await getMyPurchase(uid);
      if (docs.length > 0) {
        this.hasPurchase = true;
        this.setMyPurchase(docs);
      } else {
        this.hasPurchase = false;
      }
    },
    async removeItemFromCart(prodId) {
      await removeFromCart(prodId);
      for (let i = 0; i < this.itemsInCart.length; i++) {
        const item = this.itemsInCart[i];
        if ((item.id = prodId)) {
          this.itemsInCart.splice(i, 1);
          this.currentTotalPrice -= item.totalPoints;
        }
      }
      console.log("Successfully remove from cart...");
    },
    setProductName(payload) {
      this.productName = payload;
    },
    setProductPoints(payload) {
      this.productPoints = payload;
    },
    setProductQuantity(payload) {
      this.productQuantity = payload;
    },
    setProductCondition(payload) {
      this.productCondition = payload;
    },
    setProductDescriptions(payload) {
      this.productDescriptions = payload;
    },
    setProductPhotos(payload) {
      this.productPhotos = payload;
    },
    setProductId(payload) {
      this.productId = payload;
    },
    setItemsInCart(payload) {
      this.itemsInCart = payload;
    },
    setCurrentTotal(payload) {
      this.currentTotalPrice = payload;
    },
    setMyPurchase(payload) {
      this.myPurchases = payload;
    },
    setSoldBy(payload) {
      this.soldBy = payload;
    },
    setAllProducts(payload) {
      this.allProducts.payload;
    },
  },
});
