import { defineStore } from "pinia";
import {
  createProduct,
  currentUser,
  deleteProduct,
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
    };
  },
  getters: {
    async displayUserProduct() {
      this.productDisplay = [];
      const user = await currentUser();
      const uid = user.uid;
      //   console.log(uid);
      const listOfProducts = await getUserProducts(uid);
      const productDocs = listOfProducts.docs;
      //   console.log(productDocs);
      if (productDocs !== null) {
        productDocs.forEach((docs) => {
          const product = docs.data();
          console.log(product);
          this.productDisplay.push(product);
        });
      }
    },
    async displayForEdit() {
      const productId = String(this.productTempId);
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
    async storeProdId(productId) {
      this.productTempId = await parseInt(productId);
      console.log(this.productTempId);
      router.push("/playground");
      return router;
    },
    async editProductDetail() {
      // TODO: create edit product detail function
        const tempProdId = String(this.productTempId);
        const updatingDoc = await updateProductDoc(
          this.editProductName,
          this.editProductPoints,
          this.editProductQty,
          this.editProductCondition,
          this.editProductDescription,
          tempProdId
        );
        if(updatingDoc !== null) {
          console.log("Successfully updated product document!");
          alert("Successfully updated product document!")
          router.push('/profile')
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
