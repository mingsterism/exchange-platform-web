<template>
  <div class="flex justify-center mt-10 mb-10">
    <div class="w-10/12 px-14">
      <div class="flex mt-10">
        <div class="">
          <div class="font-semibold underline text-left ml-2 mb-3">
            <h1>Product page:</h1>
          </div>
          <div
            class="flex flex-wrap items-start gap-10 border-2 border-gray-400 rounded-lg bg-white p-2 w-max"
            id="productImgCont"
          >
            <!-- index to point at the items -->
            <Image />
          </div>
        </div>
        <div class="flex flex-col mt-10 items-start ml-5 justify-around">
          <div class="">
            <p>Product Name: {{ store.editProductName }}</p>
          </div>
          <div class="">
            <p>Product Points: {{ store.editProductPoints }}</p>
          </div>
          <div class="flex items-center">
            <p>Product Quantity:</p>
            <input
              class="border-2 border-gray-400 rounded-lg p-1.5 ml-2"
              type="number"
              name="productPoints"
              placeholder="Enter product quantity"
              v-model="store.editProductQty"
              required
            />
          </div>
          <div>
            <p>Condition: {{ store.editProductCondition }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start">
        <p class="mt-5 mb-3 ml-2">Description:</p>
        <p class="text-left border-2 p-1.5 rounded-lg w-8/12 h-96 break-words overflow-scroll">
          {{ store.editProductDescription }}
        </p>
        <div class="mt-7">
          <Button
            class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
            type="submit"
            label="Add to Cart"
            :primary="true"
            @click="store.addToCart"
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
  },
  setup() {
    const store = userProduct();
    const displayProductDetail = store.displayProductView;

    return { store, displayProductDetail };
  },
};
</script>

<style></style>
