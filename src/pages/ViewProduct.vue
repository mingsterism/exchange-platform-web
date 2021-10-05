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
            <Image :src="productPhotos[0]" />
          </div>
        </div>
        <div class="flex flex-col mt-10 items-start ml-5 justify-around">
          <div class="">
            <p>Product Name: {{ productName }}</p>
          </div>
          <div class="">
            <p>Product Points: {{ productPoints }}</p>
          </div>
          <div class="flex items-center">
            <p>Product Quantity:</p>
            <input
              class="border-2 border-gray-400 rounded-lg p-1.5 ml-2"
              type="number"
              name="productPoints"
              v-model="userQty"
              required
              :max="productQuantity"
              min="1"
            />
            <p class="ml-2 text-gray-500">{{ productQuantity }} available</p>
          </div>
          <div>
            <p>Condition: {{ productCondition }}</p>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start">
        <p class="mt-5 mb-3 ml-2">Description:</p>
        <p
          class="text-left border-2 p-1.5 rounded-lg w-8/12 h-80 break-words overflow-auto"
        >
          {{ productDescriptions }}
        </p>
        <div class="mt-7">
          <Button
            class="mb-10 transform hover:scale-110 hover:opacity-75 transition ease-out duration-300"
            type="submit"
            label="Add to Cart"
            :primary="true"
            @click="addItemToCart"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { usersStore } from "../store/users.store";
import { computed } from "@vue/runtime-core";
import { addToCart } from "../utils/cart";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
// import { userProduct } from "../store/user.product";
export default {
  data() {
    return {
      userQty: 1,
    };
  },
  components: {
    Image,
    Button,
  },
  methods: {
    returnToProfile() {
      this.$router.push("/profile");
    },
    async addItemToCart() {
      const productDetails = {
        productId: this.productId,
        id: String(Date.now()),
        name: this.productName,
        photos: this.productPhotos,
        points: this.productPoints,
        desireQuantity: Number(this.userQty),
        totalPoints: Number(this.userQty * this.productPoints),
        checkOut: false,
        soldBy: this.soldBy,
      };
      await addToCart(productDetails);
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
      // console.log(productDetails, " is added to cart");
    },
  },
  setup() {
    const store = usersStore();
    // store.displayProductView();
    const productName = computed(() => {
      return store.getProductName;
    });
    const productPoints = computed(() => {
      return store.getProductPoints;
    });
    const productQuantity = computed(() => {
      return store.getProductQuantity;
    });
    const productPhotos = computed(() => {
      return store.getProductPhotos;
    });
    const productDescriptions = computed(() => {
      return store.getProductDescriptions;
    });
    const productCondition = computed(() => {
      return store.getProductCondition;
    });
    const productId = computed(() => {
      return store.getProductId;
    });
    const soldBy = computed(() => {
      return store.getSoldBy;
    });

    return {
      store,
      productName,
      productQuantity,
      productPoints,
      productPhotos,
      productDescriptions,
      productCondition,
      productId,
      soldBy,
    };
  },
};
</script>

<style></style>
