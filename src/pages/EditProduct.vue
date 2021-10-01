<template>
  <div class="flex justify-center mt-10 mb-10">
    <div class="w-10/12 border-2 rounded-3xl px-14">
      <div class="mt-10">
        <div class="font-semibold underline text-left ml-2 mb-3">
          <h1>Product Name:</h1>
        </div>
        <div
          class="flex flex-wrap items-start gap-10 border-2 border-gray-400 rounded-lg bg-white p-2 w-11/12"
          id="productImgCont"
        >
          <!-- index to point at the items -->
          <Image />
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
      <div class="flex">
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
            <label class="text-gray-600 mt-3 p-2 text-base" for="condition"
              >Condition</label
            >
            <select
              class="border-2 border-gray-400 rounded-md text-sm p-2"
              name="condition"
              v-model="condition"
            >
              <option value="almostNew">ALMOST NEW</option>
              <option value="slightlyUsed">SLIGHTLY USED</option>
              <option value="used">USED</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start">
        <label
          for="productDescription"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Description</label
        >
        <textarea
          name="productDescription"
          class="border-2 border-gray-400 rounded-lg p-1.5"
          id="productDescription"
          cols="80"
          rows="5"
          placeholder="Enter product description here."
          v-model="productDescription"
        ></textarea>
        <div class="mt-7">
          <Button
            class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
            type="submit"
            label="Update"
            :primary="true"
            @click="updateDetails"
          />
          <Button
            class="mb-10 ml-5 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
            type="submit"
            label="Cancel"
            :primary="true"
            @click="returnToProfile"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { userProduct } from "../store/user.product";
export default {
  components: {
    Image,
    Button,
  },
  methods: {
    returnToProfile() {
      this.$router.push("/profile");
    },
    updateDetails() {
      this.store.editProductDetail();
    },
  },
  computed: {
    productName: {
      get() {
        return userProduct().getEditProductName;
      },
      set(payload) {
        return userProduct().changeProductName(payload);
      },
    },
    productPoints: {
      get() {
        return userProduct().getEditProductPoints;
      },
      set(payload) {
        return userProduct().changeProductPoints(payload);
      },
    },
    productQty: {
      get() {
        return userProduct().getEditProductQty;
      },
      set(payload) {
        return userProduct().changeProductQty(payload);
      },
    },
    condition: {
      get() {
        return userProduct().editProductCondition;
      },
      set(payload) {
        return userProduct().changeProductCondition(payload);
      },
    },
    productDescription: {
      get() {
        return userProduct().getEditProductDescription;
      },
      set(payload) {
        return userProduct().changeProductDescription(payload);
      },
    },
  },
  setup() {
    const store = userProduct();
    store.displayForEdit();

    return { store };
  },
};
</script>

<style></style>
