<template>
  <div>
    <div>
      <div
        class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2"
        id="productImgCont"
      >
        <!-- index to point at the items -->
        <Image
          v-for="image in productPhotos"
          :key="image.id"
          :src="image.src"
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
    </div>
    <div class="flex px-52">
      <div class="flex flex-col items-start mr-10">
        <label
          for="productName"
          class="text-gray-600 mt-3 h-auto text-left p-2"
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
        <label
          for="productQty"
          class="text-gray-600 mt-3 h-auto text-left p-2"
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
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async createProduct() {
      const user = firebase.auth().currentUser
      const productDetails = {
        id: Date.now(),
        uploadedBy: user.uid,
        name: this.productName,
        points: this.productPoints,
        quantity: this.productQty,
        conditions: this.productCondition,
        description: this.productDescription,
        status: "true",
        photos: this.productPhotos,
      };
      await userProduct().createUserProduct(productDetails);
      this.productName = "";
      this.productPoints = "";
      this.productQty = "";
      this.productPhotos = [];
      this.productCondition = "";
      this.productDescription = "";
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
