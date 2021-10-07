import { defineStore } from "pinia";
import router from "../router/router";
import {
  addToMyPurchase,
  getCart,
  getMyPurchase,
  removeFromCart,
} from "../utils/cart";
import { getAllUserProducts } from "../utils/firebase";

// useStore could be anything like useUser, useCart
export const usersStore = defineStore({
  // unique id of the store across your application
  id: Math.random(),
  state() {
    return {
      apparel: null,
      hideIcon: true,
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
    getApparels: (state) => {
      return state.apparel;
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
  },
  actions: {
    addApparel(name) {
      console.log([...this.apparel, name]);
      this.rounds += 1;
      this.apparel = [...this.apparel, name];
    },
    async displayAllProducts() {
      this.apparel = [];
      const listOfProducts = await getAllUserProducts();
      const productDocs = listOfProducts;
      // console.log(productDocs);
      if (productDocs !== null) {
        //   this.emptyStatus = false
        // this.hideIcon = false;
        this.apparel = productDocs;
        console.log("Successfully read from all items directory...");
      }
    },
    goToProductPage(userId, productId) {
      // this.productTempId = String(productId);
      // this.userTempId = userId;
      // console.log(this.productTempId);
      this.displayProductView(userId, productId);
      router.push("/view-product");
      return router;
    },
    async displayProductView(productId) {
      // const productId = this.productTempId;
      // const usersId = this.userTempId;
      // const productCurrentDetail = await getOtherUserProduct(
      //   usersId,
      //   productId
      // );
      this.setProductId(productId);
      for (let i = 0; i < this.apparel.length; i++) {
        const product = this.apparel[i];
        if (product.id === productId) {
          // console.log(product);
          this.setProductName(product.name);
          this.setProductPoints(product.points);
          this.setProductQuantity(product.quantity);
          this.setProductCondition(product.conditions);
          this.setProductDescriptions(product.description);
          this.setProductPhotos(product.photos);
          this.setSoldBy(product.uploadedBy);
          break;
        }
      }
      console.log("Successfully read product doc...");
    },
    async showItemsInCart() {
      let grandTotal = 0;
      const getDocs = await getCart();
      this.setItemsInCart(getDocs);
      for (let i = 0; i < getDocs.length; i++) {
        const itemPrice = getDocs[i].totalPoints;
        grandTotal += itemPrice;
      }
      this.setCurrentTotal(grandTotal);
    },
    checkOutItems() {
      console.log("items in cart: ", this.itemsInCart);
      addToMyPurchase(this.itemsInCart);
    },
    async getMyPurchasedItems() {
      const docs = await getMyPurchase();
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
  },
});
