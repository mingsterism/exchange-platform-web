<template>
  <!-- <div className="shadow-md w-80 rounded-lg flex flex-col">
    <div class="relative">
      <p
        @click="goToEditor(post.id)"
        class="absolute right-9 -top-3 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-blue-400 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-pencil-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </svg>
      </p>
      <p
        @click="removeProduct(post.id)"
        class="absolute -right-2 -top-3 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-red-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-trash-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </p>
    </div>
    <div class="rounded-t-md min-h-30 max-h-48 overflow-hidden">
      <img :src="post.photos[0]" className="p-0" />
    </div>

    <div>
      <div className="py-4 p-3 text-left">
        <div className="flex justify-between pb-2">
          <p className="text-2xl font-semibold">{{ post.name }}</p>
          <p className="mr-2 text-lg font-semibold self-center bg-red-100">
            {{ post.shipping }}
          </p>
        </div>
        <div class="min-h-36">
          <p className="break-words overflow-hidden">{{ post.description }}</p>
          <p>Price: {{ post.points }} points</p>
          <p>Current Quantity: {{ post.quantity }}</p>
        </div>
      </div>
    </div>
  </div> -->
  <div
    class="min-w-xs max-w-xs mx-auto overflow-hidden justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800"
  >
    <div class="relative">
      <p
        @click="goToEditor(post.id)"
        class="absolute right-11 top-1 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-blue-400 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-pencil-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </svg>
      </p>
      <p
        @click="removeProduct(post.id)"
        class="absolute right-1 top-1 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-red-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-trash-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </p>
    </div>
    <div class="px-4 py-2 text-left">
      <h1
        class="text-2xl font-semibold truncate text-gray-800 capitalize dark:text-white"
      >
        {{ post.name }}
      </h1>
      <p class="mt-1 truncate text-black dark:text-gray-400">
        {{ post.description }}
      </p>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Available Quantity: {{ post.quantity }}
      </p>
      <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
        Conditions: {{ post.conditions }}
      </p>
    </div>

    <img
      class="object-cover w-full h-48 mt-2"
      :src="post.photos[0]"
      alt="product image"
    />

    <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
      <h1 class="text-lg font-bold text-white">{{ post.points }} points</h1>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue";
import { userProduct } from "/@/store/user.product.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "Card",
  components: {
    Button,
  },
  props: ["post"],

  methods: {
    removeProduct(prodId) {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, please",
        denyButtonText: `No, Don't delete`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.store.deleteProductDoc(prodId);
          Swal.fire("Deleted!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("You did not delete the product.", "", "info");
        }
      });
      // this.store.deleteProductDoc(prodId);
    },
    goToEditor(prodId) {
      this.store.goToEditorPage(prodId);
    },
  },

  setup() {
    const store = userProduct();

    return { store };
  },
};
</script>

<style scoped></style>
