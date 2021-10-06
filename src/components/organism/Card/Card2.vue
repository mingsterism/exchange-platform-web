<template>
  <div
    class="min-w-xs max-w-xs mx-auto overflow-hidden justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800"
  >
    <div class="px-4 py-2 text-left">
      <h1 class="text-3xl font-bold text-gray-800 uppercase dark:text-white">
        {{ post.name }}
      </h1>
      <p class="mt-1 text-sm truncate text-gray-600 dark:text-gray-400">
        {{ post.description }}
      </p>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
        Available Quantity: {{ post.quantity }}
      </p>
      <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
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
      <button
        type="button"
        @click="showProduct(post.id)"
        class="px-2 py-1 text-xs font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
      >
        View Product
      </button>
    </div>
  </div>
</template>

<script>
// import Button from "../../molecule/Button/Button.vue";
import { usersStore } from "/@/store/users.store";
// import { userProduct } from "/@/store/user.product.js";

export default {
  name: "Card",
  // components: {
  //   Button,
  // },
  props: ["post"],
  methods: {
    showProduct(prodId) {
      console.log("fire an event");
      this.store.displayProductView(prodId);
      this.$router.push("/view-product");
    },
  },
  setup() {
    const store = usersStore();

    return { store };
  },
};
</script>

<style scoped></style>
