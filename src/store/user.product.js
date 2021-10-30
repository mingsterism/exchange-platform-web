import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import {
  createProduct,
  updateProductPhotos,
  getUserProducts,
  deleteProduct,
  updateProductDoc,
} from "../firebase/product";
import { uploadProdImg, deleteProdImg } from "../firebase/storage";
import { updateWallet } from "../firebase/profile";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { userProfile } from "./user.profile";
import router from "../router/router";

// useStore could be anything like useUser, useCart
export const userProduct = defineStore({
  // unique id of the store across your application
  id: "userProduct",
  state() {
    return {
      id: "",
      productToEdit: [],
      productPhotos: [],
      productDisplay: [],
      productTempId: "",
      editProductName: "",
      editProductPoints: "",
      editProductQty: "",
      editProductCondition: "",
      editProductDescription: "",
      editProductPhotos: null,
      userTempId: "",
      emptyStatus: true, // use to show that there is no products in current user account
      uploadComplete: false, // use to track the product image upload process
    };
  },
  getters: {
    getProductDisplay: (state) => {
      return state.productDisplay;
    },
    getEmptyStatus: (state) => {
      return state.emptyStatus;
    },
    getEditProductName: (state) => {
      return state.editProductName;
    },
    getEditProductPoints: (state) => {
      return state.editProductPoints;
    },
    getEditProductQty: (state) => {
      return state.editProductQty;
    },
    getEditProductCondition: (state) => {
      return state.editProductCondition;
    },
    getEditProductDescription: (state) => {
      return state.editProductDescription;
    },
    getEditProductPhotos: (state) => {
      return state.editProductPhotos;
    },
    getProductToEdit: (state) => {
      return state.productToEdit;
    },
  },
  actions: {
    async createUserProduct(productDetails, files) {
      const profile = userProfile();
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const prodDocId = productDetails.id;
      const totalPoints = productDetails.points * productDetails.quantity;
      if (productDetails !== null) {
        await createProduct(uid, productDetails);
        await updateWallet(uid, totalPoints);
        await uploadProdImg(files, prodDocId);
        profile.getProfile();
        if (this.uploadComplete) {
          await updateProductPhotos(uid, this.productPhotos, prodDocId);
          console.log("Successfully added the product: ", productDetails.name);
          this.displayUserProduct();
          this.productPhotos = [];
          Swal.fire({
            title: "Success",
            icon: "success",
            text: "Sucessfully added new product.",
            confirmButtonColor: "#1ea7fd",
          });
        } else {
          console.log("Fail to add product...");
        }
      } else {
        console.log(error);
      }
    },
    addPhotoUrl(payload) {
      this.productPhotos.push(payload);
    },
    async displayUserProduct(userId) {
      this.productDisplay = [];
      const listOfProducts = await getUserProducts(userId);
      const productDocs = listOfProducts;
      // console.log(productDocs);
      if (productDocs.length > 0) {
        this.emptyStatus = false;
        this.productDisplay = productDocs;
        // console.log(this.productDisplay);
      } else {
        this.emptyStatus = true;
      }
    },
    async deleteProductDoc(productInfo) {
      const profile = userProfile();
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      const productInfomation = productInfo;
      const amount = -Number(
        productInfomation.points * productInfomation.quantity
      );
      console.log("current amount for this product is ", amount);
      const folderLocation = uid + "&" + productInfomation.id;
      // console.log("folderLocation:", folderLocation);
      await updateWallet(uid, amount);
      await deleteProduct(uid, String(productInfomation.id));
      profile.getProfile();
      for (let i = 0; i < productInfomation.photos.length; i++) {
        const photoLink = productInfomation.photos[i];
        deleteProdImg(folderLocation, photoLink);
      }
      for (let i = 0; i < this.productDisplay.length; i++) {
        const item = this.productDisplay[i];
        if (item.id === productInfomation.id) {
          this.productDisplay.splice(i, 1);
          break;
        }
      }
    },
    goToEditorPage(product) {
      this.productToEdit = [];
      this.productToEdit.push(product);
      // console.log(this.productTempId);
      this.editProductName = this.productToEdit[0].name;
      this.editProductPoints = this.productToEdit[0].points;
      this.editProductQty = this.productToEdit[0].quantity;
      this.editProductCondition = this.productToEdit[0].conditions;
      this.editProductDescription = this.productToEdit[0].description;
      this.editProductPhotos = this.productToEdit[0].photos;
      router.push("/edit-product");
      return router;
    },
    async editProductDetail() {
      console.log("updating product document...");
      const newDetails = {
        name: this.editProductName,
        quantity: this.editProductQty,
        conditions: this.editProductCondition,
        description: this.editProductDescription,
      };
      const user = firebase.auth().currentUser;
      const uid = user.uid;
      console.log("before updating...");
      const updatingDoc = await updateProductDoc(
        uid,
        newDetails,
        this.productToEdit[0].id
      );
      console.log("after updating...");
      if (updatingDoc !== null) {
        this.displayUserProduct(uid);
        router.push("/user/my-product");
        return Swal.fire({
          title: "Success",
          icon: "success",
          text: "Sucessfully updated product details.",
          confirmButtonColor: "#1ea7fd",
        });
      } else {
        console.log("Failed to update product details...");
      }
    },
    changeProductName(payload) {
      this.editProductName = payload;
    },
    changeProductPoints(payload) {
      this.editProductPoints = payload;
    },
    changeProductQty(payload) {
      this.editProductQty = payload;
    },
    changeProductCondition(payload) {
      this.editProductCondition = payload;
    },
    changeProductDescription(payload) {
      this.editProductDescription = payload;
    },
  },
});
