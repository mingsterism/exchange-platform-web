import { defineStore } from "pinia";
import {
  createProduct,
  deleteProduct,
  getOtherUserProduct,
  getSpecificProduct,
  getUserProducts,
  updateProductDoc,
  updateProductPhotos,
} from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import router from "../router/router";
import { uploadProdImg } from "../utils/storage";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

// useStore could be anything like useUser, useCart
export const userProduct = defineStore({
  // unique id of the store across your application
  id: "userProduct",
  state() {
    return {
      id: "",
      uploadedBy: "",
      productName: "",
      // productPoints: "",
      // productQty: "",
      // productCondition: "",
      // productDescription: "",
      // productStatus: "",
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
  },
  actions: {
    popProductImage() {
      if (this.productPhotos.length > -1) {
        this.productPhotos.pop();
      }
      // console.log(this.productPhotos);
    },
    async createUserProduct(productDetails, files) {
      const prodDocId = String(productDetails.id);
      // console.log(productDetails);
      if (productDetails !== null) {
        await createProduct(prodDocId, productDetails);
        await uploadProdImg(files, prodDocId);
        if (this.uploadComplete) {
          await updateProductPhotos(this.productPhotos, prodDocId);
          console.log("Successfully added the product: ", productDetails.name);
          this.displayUserProduct();
          // alert("Successfully added the product.");
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
    goToEditorPage(productId) {
      this.productTempId = String(productId);
      // console.log(this.productTempId);
      router.push("/edit-product");
      return router;
    },
    // goToProductPage(userId, productId) {
    //   this.productTempId = String(productId);
    //   this.userTempId = userId;
    //   // console.log(this.productTempId);
    //   router.push("/view-product");
    //   return router;
    // },
    async editProductDetail() {
      const tempProdId = String(this.productTempId);
      const updatingDoc = await updateProductDoc(
        this.editProductName,
        this.editProductPoints,
        this.editProductQty,
        this.editProductCondition,
        this.editProductDescription,
        tempProdId
      );
      if (updatingDoc !== null) {
        console.log("Successfully updated product document!");
        alert("Successfully updated product document!");
        router.push("/profile");
      } else {
        console.log("Failed to update product details...");
      }
    },
    async deleteProductDoc(productId) {
      await deleteProduct(String(productId));
      for (let i = 0; i < this.productDisplay.length; i++) {
        const item = this.productDisplay[i];
        if (item.id === parseInt(productId)) {
          this.productDisplay.splice(i, 1);
          break;
        }
      }
    },
    async displayUserProduct() {
      this.productDisplay = [];
      const listOfProducts = await getUserProducts();
      const productDocs = listOfProducts;
      // console.log(productDocs);
      if (productDocs !== null) {
        this.emptyStatus = false;
        this.productDisplay = productDocs;
      } else {
        this.emptyStatus = true;
      }
    },
    async displayForEdit() {
      const productId = this.productTempId;
      const productCurrentDetail = await getSpecificProduct(productId);
      if (productCurrentDetail !== null) {
        // console.log("Product Document: ", productCurrentDetail);
        this.editProductName = productCurrentDetail.name;
        this.editProductPoints = productCurrentDetail.points;
        this.editProductQty = productCurrentDetail.quantity;
        this.editProductCondition = productCurrentDetail.conditions;
        this.editProductDescription = productCurrentDetail.description;
        this.editProductPhotos = productCurrentDetail.photos;
      }
    },
    // async displayProductView() {
    //   const productId = this.productTempId;
    //   const usersId = this.userTempId;
    //   const productCurrentDetail = await getOtherUserProduct(
    //     usersId,
    //     productId
    //   );
    //   if (productCurrentDetail !== null) {
    //     // console.log("Product Document: ", productCurrentDetail);
    //     this.editProductName = productCurrentDetail.name;
    //     this.editProductPoints = productCurrentDetail.points;
    //     this.editProductQty = productCurrentDetail.quanity;
    //     this.editProductCondition = productCurrentDetail.conditions;
    //     this.editProductDescription = productCurrentDetail.description;
    //   }
    // },
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
    addPhotoUrl(payload) {
      this.productPhotos.push(payload);
    },
  },
});
