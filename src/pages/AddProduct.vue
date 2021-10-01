<template>
  <div>
    <div>
      <div
        class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2"
        id="productImgCont"
      >
        <!-- index to point at the items -->
        <Image
          v-for="(image, index) in productPhotos"
          :key="index"
          :src="image"
        />
        <div class="flex flex-col justify-around h-48">
          <input
            class="hidden"
            type="file"
            accept="image/*"
            name="image"
            id="uploadProductImg"
            @change="uploadProductImage($event)"
          />
          <label
            class="border-2 border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white transition ease-linear duration-300"
            for="uploadProductImg"
            style="cursor: pointer"
            >Upload</label
          >
          <input
            class="hidden"
            type="button"
            name="popImage"
            id="popProductImage"
            @click="popProductImage()"
          />
          <label
            class="border-2 border-gray-400 p-2 rounded-md hover:bg-blue-600 hover:text-white transition ease-linear duration-300"
            for="popProductImage"
            style="cursor: pointer"
            >Delete</label
          >
        </div>
      </div>
      <div class="ml-52 mt-2">
        <p class="text-left text-sm">*Please note that the first photo will be the primary.</p>
      </div>
    </div>
    <div class="flex px-52">
      <div class="flex flex-col items-start mr-10">
        <label for="productName" class="text-gray-600 mt-3 h-auto text-left p-2"
          >Product Name</label
        >
        <input
          class="border-2 border-gray-400 rounded-lg p-1.5"
          type="text"
          name="productName"
          placeholder="Enter product name"
          v-model="productName"
          required
        />
      </div>
      <div class="flex flex-col items-start mr-10">
        <label
          for="productPoints"
          class="text-gray-600 mt-3 h-auto text-left p-2"
          >Product Points</label
        >
        <input
          class="border-2 border-gray-400 rounded-lg p-1.5"
          type="number"
          name="productPoints"
          placeholder="Enter product value"
          v-model="productPoints"
          required
        />
      </div>
      <div class="flex flex-col items-start mr-10">
        <label for="productQty" class="text-gray-600 mt-3 h-auto text-left p-2"
          >Product Quantity</label
        >
        <input
          class="border-2 border-gray-400 rounded-lg p-1.5"
          type="number"
          name="productQty"
          placeholder="Enter product quantity"
          v-model="productQty"
          required
        />
      </div>
      <div class="flex justify-start">
        <div class="flex flex-col items-start">
          <label class="text-gray-600 mt-3 p-2" for="condition"
            >Condition</label
          >
          <select
            class="border-2 border-gray-400 rounded-md text-sm p-2"
            name="condition"
            v-model="productCondition"
          >
            <option value="almostNew">ALMOST NEW</option>
            <option value="slightlyUsed">SLIGHTLY USED</option>
            <option value="used">USED</option>
          </select>
        </div>
      </div>
    </div>
    <div class="flex flex-col items-start px-52">
      <label
        for="productDescription"
        class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
        >Description</label
      >
      <textarea
        name="productDescription"
        class="border-2 border-gray-400 rounded-lg p-1.5"
        id="productDescription"
        cols="90"
        rows="10"
        placeholder="Enter product description here."
        v-model="productDescription"
      ></textarea>
      <div class="mt-7">
        <Button
          class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
          type="submit"
          @click="createProduct"
          label="Add Product"
          :primary="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { userProduct } from "../store/user.product.js";
import "firebase/auth";
import firebase from "firebase/app";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "AddProduct",
  data() {
    return {
      productPhotos: [],
      productName: "",
      productPoints: null,
      productQty: null,
      productCondition: "",
      productDescription: "",
      imgFiles: [],
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async createProduct() {
      if (this.productName === null || this.productName === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product name.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productPoints === null || this.productPoints === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product points.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productQty === null || this.productQty === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product quantity.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productCondition === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product conditions.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productDescription === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product descriptions.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      Swal.fire({
        icon: "info",
        title: "Uploading in progress...",
        showConfirmButton: false,
        timer: 2000,
      });
      const user = firebase.auth().currentUser;
      const productDetails = {
        id: Date.now(),
        uploadedBy: user.uid,
        name: this.productName,
        points: parseInt(this.productPoints),
        quantity: parseInt(this.productQty),
        conditions: this.productCondition,
        description: this.productDescription,
        status: "true",
        photos: [],
      };
      await userProduct().createUserProduct(productDetails, this.imgFiles);
      this.productName = "";
      this.productPoints = "";
      this.productQty = "";
      this.imgFiles = [];
      this.productPhotos = [];
      this.productCondition = "";
      this.productDescription = "";
    },
    uploadProductImage(event) {
      if (this.productPhotos.length <= 2) {
        console.log(event.target.files);
        this.productPhotos.push(URL.createObjectURL(event.target.files[0]));
        this.imgFiles.push(event.target.files[0]);
        console.log("Current images: ", this.productPhotos);
        console.log("Current files: ", this.imgFiles);
      } else {
        console.log("Cannot upload more than 3 images...");
      }
    },
  },
  components: {
    Image,
    Button,
  },
  setup() {
    const store = userProduct();

    return { store };
  },
};
</script>

<style scoped></style>
