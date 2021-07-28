import { defineStore } from "pinia";
import {
  createProduct,
  currentUser,
  deleteProduct,
  getUserProducts,
} from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";

// useStore could be anything like useUser, useCart
export const userProduct = defineStore({
  // unique id of the store across your application
  id: "userProduct",
  state() {
    return {
      id: "",
      uploadedBy: "",
      productName: "",
      productPoints: "",
      productQty: "",
      productCondition: "",
      productDescription: "",
      productStatus: "",
      productPhotos: [],
      productDisplay: [],
    };
  },
  getters: {
    async displayUserProduct() {
      const user = currentUser();
      const uid = user.uid;
      //   console.log(uid);
      const listOfProducts = await getUserProducts(uid);
      const productDocs = listOfProducts.docs;
      //   console.log(productDocs);
      if (
        productDocs !== null &&
        this.productDisplay.length < productDocs.length
        // * Currently this is still broken as the following expression
        // * does not stop the function from adding extra documents
        // TODO: need to create an expression to make sure it does not
        // TODO: add in duplicate document to productDisplay array
      ) {
        productDocs.forEach((docs) => {
          const product = docs.data();
          console.log(product);
          this.productDisplay.push(product);
        });
      }
    },
  },
  actions: {
    uploadProductImage(event) {
      if (this.productPhotos.length <= 6) {
        this.productPhotos.push({
          src: URL.createObjectURL(event.target.files[0]),
        });
      }
      console.log(this.productPhotos);
    },
    popProductImage() {
      if (this.productPhotos.length > -1) {
        this.productPhotos.pop();
      }
      console.log(this.productPhotos);
    },
    async createUserProduct() {
      const user = currentUser();
      const productDetails = {
        id: Date.now(),
        uploadedBy: user.uid,
        name: this.productName,
        points: this.productPoints,
        quanity: this.productQty,
        conditions: this.productCondition,
        description: this.productDescription,
        status: "true",
        photos: this.productPhotos,
      };
      const prodDocId = String(productDetails.id);
      console.log(productDetails);
      if (productDetails !== null) {
        await createProduct(prodDocId, productDetails);
        console.log("Successfully added the product: ", productDetails.name);
        this.displayUserProduct;
        alert("Successfully added the product.");
        this.productName = "";
        this.productPoints = "";
        this.productQty = "";
        this.productPhotos = [];
        this.productCondition = "";
        this.productDescription = "";
      } else {
        console.log(error);
      }
    },
    async editProductDetail() {
        // TODO: create edit product detail function
    },
    async deleteProductDoc(productId) {
      await deleteProduct(String(productId));
      for (let i = 0; i < this.productDisplay.length; i++) {
        const item = this.productDisplay[i];
        if (item.id === parseInt(productId)) {
          this.productDisplay.splice(index, 1);
          break;
        }
      }
    },
  },
});
