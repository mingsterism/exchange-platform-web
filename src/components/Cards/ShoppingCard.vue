<template>
  <div>
    <div
      class="w-full md:w-auto md:min-w-xs max-w-xs mx-auto overflow-hidden justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800 transform hover:-translate-y-2 hover:border-2 hover:border-gray-600 cursor-pointer"
      @click="showProduct(post.photos)"
    >
      <img
        class="object-cover w-full h-28 md:h-48"
        :src="post.photos[0]"
        alt="product image"
      />
      <div class="px-2 md:px-4 py-2 text-left w-44 md:w-auto">
        <div>
          <h1
            class="md:text-xl font-semibold truncate text-gray-800 capitalize dark:text-white"
          >
            {{ post.name }}
          </h1>
          <p
            class="text-xs md:text-base truncate text-black dark:text-gray-400"
          >
            {{ post.description }}
          </p>
        </div>
        <div class="mt-2">
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Available Quantity: {{ post.quantity }}
          </p>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Conditions: {{ post.conditions }}
          </p>
        </div>
      </div>
      <div
        class="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 bg-gray-500"
      >
        <h1 class="text-xs md:text-lg font-medium md:font-bold text-white">
          {{ post.points }} points
        </h1>
      </div>
    </div>
    <div
      v-if="visible"
      class="flex justify-center items-center fixed h-screen z-30 inset-0 bg-black bg-opacity-60"
    >
      <div
        class="w-10/12 md:w-auto border rounded-lg py-2 md:py-7 px-4 md:px-10 border-gray-200 bg-white relative shadow-lg"
      >
        <div class="absolute right-2 top-2 hover:opacity-60">
          <button @click="visible = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-x h-7"
              viewBox="0 0 16 16"
            >
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div>
          <p
            class="text-xl text-left font-semibold text-gray-800 capitalize mb-2"
          >
            {{ post.name }}
          </p>
          <div class="h-px bg-gray-300"></div>
        </div>
        <div class="flex justify-center">
          <button
            type="button"
            class="hover:scale-125 transform transition ease-in-out duration-200"
            @click="clickLeft"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <img
            class="object-cover w-full md:w-auto md:min-w-sm h-48 xl:h-60 my-6 mx-2"
            :src="post.photos[photoIndex]"
            alt="product image"
          />

          <button
            type="button"
            class="hover:scale-125 transform transition ease-in-out duration-200"
            @click="clickRight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div class="text-left w-80 md:w-full">
          <h1 class="mb-1 md:text-lg font-bold">{{ post.points }} points</h1>
          <p class="mb-1 text-black text-sm md:text-base">
            {{ post.description }}
          </p>
          <div class="mb-4">
            <p class="text-gray-500 text-sm">
              Available Quantity: {{ post.quantity }}
            </p>
            <p class="text-gray-500 text-sm">
              Condition: {{ post.conditions }}
            </p>
          </div>
          <div class="h-px bg-gray-300"></div>
        </div>
        <div class="mt-4 flex justify-between text-sm md:text-base">
          <div class="flex items-center">
            <label for="qty" class="text-gray-500 text-sm md:text-base"
              >Quantity:</label
            >
            <div
              class="flex items-center border border-collapse border-gray-300 rounded-md ml-1"
            >
              <button
                type="button"
                class="hover:opacity-60"
                @click="userQty === post.quantity ? null : userQty++"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-plus h-4 md:h-6 px-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  />
                </svg>
              </button>

              <input
                class="border-l border-r border-gray-300 text-sm md:text-base text-center p-1 w-9 md:w-11"
                type="number"
                name="productPoints"
                v-model="userQty"
                required
                :max="post.quantity"
                min="1"
              />

              <button
                type="button"
                class="hover:opacity-60"
                @click="userQty === 1 ? null : userQty--"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-dash h-4 md:h-6 px-1"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            @click="addItemToCart()"
            type="button"
            class="px-4 py-2 font-medium text-white btnDark capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "/@/firebase/cart";

export default {
  name: "Card",
  props: ["post"],
  data() {
    return {
      visible: false,
      userQty: 1,
      photoIndex: 0,
      photoQty: null,
    };
  },
  methods: {
    showProduct(prodPhotos) {
      this.photoQty = prodPhotos.length;
      // console.log("Photo qty for this product is ", this.photoQty);
      this.visible = true;
    },
    clickLeft() {
      if (this.photoIndex === 0) {
        return;
      } else {
        this.photoIndex -= 1;
      }
    },
    clickRight() {
      if (this.photoIndex === this.photoQty - 1) {
        return;
      } else {
        this.photoIndex += 1;
      }
    },
    async addItemToCart() {
      const productDetail = this.post;
      // console.log("Product Detail: ", productDetail);
      const addItem = {
        productId: productDetail.id,
        id: String(Date.now()),
        name: productDetail.name,
        photos: productDetail.photos,
        points: productDetail.points,
        currentQty: productDetail.quantity,
        desireQuantity: Number(this.userQty),
        totalPoints: Number(this.userQty * productDetail.points),
        checkOut: false,
        soldBy: productDetail.uploadedBy,
      };
      // console.log("Added item: ", addItem);
      await addToCart(addItem);
      this.visible = false;
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
};
</script>

<style lang="scss">
.popOutColor {
  background-color: $pop-out;
}

.btnDark {
  background-color: $dark;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>
