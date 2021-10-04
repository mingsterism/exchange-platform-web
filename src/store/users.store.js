import { defineStore } from "pinia";
import router from "../router/router";
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
      productDescriptions: null,
      productCondition: null,
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
      for (let i = 0; i < this.apparel.length; i++) {
        const product = this.apparel[i];
        if (product.id === productId) {
          console.log(product);
          this.setProductName(product.name);
          this.setProductPoints(product.points);
          this.setProductQuantity(product.quantity);
          this.setProductCondition(product.conditions);
          this.setProductDescriptions(product.description);
          this.setProductPhotos(product.photos);
          break;
        }
      }
      console.log("Successfully read product doc...");
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
  },
});
