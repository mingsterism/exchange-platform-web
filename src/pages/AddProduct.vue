<template>
  <div>
    <div>
      <div
        class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2"
        id="productImgCont"
      >
        <!-- index to point at the items -->
        <Image v-for="image in images" :key="image.id" :src="image.src" />
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
            @click="popProductImage($event)"
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
      <div class="flex flex-col items-start mr-16">
        <label
          for="productName"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Product Name</label
        >

        <input
          class="border-4 border-gray-400 rounded-lg p-1.5"
          type="text"
          name="productName"
          placeholder="Enter product name"
          v-model="productName"
          required
        />
      </div>
      <div class="flex flex-col items-start mr-16">
        <label
          for="productPoints"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Product Points</label
        >
        <input
          class="border-4 border-gray-400 rounded-lg p-1.5"
          type="number"
          name="productPoints"
          placeholder="Enter product value"
          v-model="productPoints"
          required
        />
      </div>
      <div class="flex flex-col items-start mr-16">
        <label
          for="productQty"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Product Quantity</label
        >
        <input
          class="border-4 border-gray-400 rounded-lg p-1.5"
          type="number"
          name="productQty"
          placeholder="Enter product quantity"
          v-model="productQty"
          required
        />
      </div>
      <div class="flex justify-start">
        <Dropdown class="" />
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
        class="border-4 border-gray-400 rounded-lg p-1.5"
        id="productDescription"
        cols="90"
        rows="10"
        placeholder="Enter product description here."
        v-model="productDescription"
      ></textarea>
      <div class="mt-7">
        <!-- <Button class="mb-10 hover:bg-white hover:text-black hover:border-black transition ease-linear duration-500" type="submit" label="Add Product" :primary="true" /> -->
        <!-- <button type="submit" class="border-2 p-3 rounded-lg bg-blue-400 border-gray-300 text-white mb-28">Add Product</button> -->
        <Button
          class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
          type="submit"
          @click="handleSubmit"
          label="Add Product"
          :primary="true"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Dropdown from "/@/components/molecule/Dropdown/Dropdown.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { createProduct, currentUser } from "/@/utils/firebase";
import firebase from "firebase";

export default {
  name: "AddProduct",
  data() {
    return {
      images: [
        {
          id: "1",
          src:
            "https://images.theconversation.com/files/371985/original/file-20201130-13-xieqc.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C5129%2C2560&q=45&auto=format&w=668&h=324&fit=crop",
        },
      ],
      addProductDetails: [],
      productName: "",
      productPoints: "",
      productDescription: "",
      productQty: "",
      condition: "",
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleSubmit() {
      let testProduct;
      const user = currentUser();
      // to see the values generated
      console.log(
        this.productName,
        this.productPoints,
        this.productQty,
        this.condition,
        this.productDescription
      );
      this.addProductDetails.push({
        id: Date.now(),
        uploadedBy: user.uid,
        name: this.productName,
        points: this.productPoints,
        quanity: this.productQty,
        conditions: this.condition,
        description: this.productDescription,
        status: "true",
        photos: this.images,
      });
      // to check whether it is stored into addProductDetails
      console.log(this.addProductDetails);
      // adding objects into testProduct variable
      testProduct = {
        id: Date.now(),
        uploadedBy: user.uid,
        name: this.productName,
        points: this.productPoints,
        quanity: this.productQty,
        conditions: this.condition,
        description: this.productDescription,
        status: "true",
        photos: this.images,
      };
      // storing the data into the firestore
      // for status, true means product is available
      // false means product is in shipping, shipped or paid
      // const user = currentUser();

      if (user !== null) {
        // const newProduct = db.collection("userProfile").doc(uid).collection('products').add(this.addProductDetails)
        // create new document with info from testProduct into the subCollection
        createProduct(testProduct, user.uid)
          .then(function () {
            console.log("product created.");
            // clear the inputs after adding product
          })
          .then(function () {
            alert("Successfully added the product");
          });
      }
      this.productName = "";
      this.productPoints = "";
      this.condition = "";
      this.productDescription = "";
      this.productQty = "";
      this.images = [];
      // this.$router.push("/profile_add");
      // need create a storage link to store images
      // link the user ID with their products
    },
    uploadProductImage: function (event) {
      if (this.images.length <= 6) {
        this.images.push({
          id: Date.now(),
          src: URL.createObjectURL(event.target.files[0]),
        });
        console.log(this.images);
      }
    },
    popProductImage: function (event) {
      if (this.images.length > -1) {
        this.images.pop();
      }
      console.log(this.images);
    },
  },
  components: {
    Image,
    Dropdown,
    Button,
  },
};
</script>

<style scoped></style>
