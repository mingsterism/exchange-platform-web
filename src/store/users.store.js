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
    };
  },
  getters: {
    getApparels:(state) => {
      return state.apparel;
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
  },
});
