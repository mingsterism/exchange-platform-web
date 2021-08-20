import { defineStore } from "pinia";
import {
  createProduct,
  deleteProduct,
  getOtherUserProduct,
  getSpecificProduct,
  getUserProducts,
  updateProductDoc,
} from "../utils/firebase";
import "firebase/firestore";
import "firebase/auth";
import router from "../router/router";

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
      productTempId: "",
      editProductName: "",
      editProductPoints: "",
      editProductQty: "",
      editProductCondition: "",
      editProductDescription: "",
      userTempId: "",
      emptyStatus: true, // use to show that there is no products in current user account
    };
  },
  getters: {
    async displayUserProduct() {
      this.productDisplay = [];
      const listOfProducts = await getUserProducts();
      const productDocs = listOfProducts;
      console.log(productDocs);
      if (productDocs !== null) {
        this.emptyStatus = false;
        this.productDisplay = productDocs;
      }
    },
    async displayForEdit() {
      const productId = this.productTempId;
      const productCurrentDetail = await getSpecificProduct(productId);
      if (productCurrentDetail !== null) {
        console.log("Product Document: ", productCurrentDetail);
        this.editProductName = productCurrentDetail.name;
        this.editProductPoints = productCurrentDetail.points;
        this.editProductQty = productCurrentDetail.quanity;
        this.editProductCondition = productCurrentDetail.conditions;
        this.editProductDescription = productCurrentDetail.description;
      }
    },
    async displayProductView() {
      const productId = this.productTempId;
      const usersId = this.userTempId;
      const productCurrentDetail = await getOtherUserProduct(
        usersId,
        productId
      );
      if (productCurrentDetail !== null) {
        console.log("Product Document: ", productCurrentDetail);
        this.editProductName = productCurrentDetail.name;
        this.editProductPoints = productCurrentDetail.points;
        this.editProductQty = productCurrentDetail.quanity;
        this.editProductCondition = productCurrentDetail.conditions;
        this.editProductDescription = productCurrentDetail.description;
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
      const user = await currentUser();
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
    goToEditorPage(productId) {
      this.productTempId = String(productId);
      console.log(this.productTempId);
      router.push("/edit-product");
      return router;
    },
    goToProductPage(userId, productId) {
      this.productTempId = String(productId);
      this.userTempId = userId;
      console.log(this.productTempId);
      router.push("/view-product");
      return router;
    },
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
          this.productDisplay.splice(index, 1);
          break;
        }
      }
    },
  },
});
