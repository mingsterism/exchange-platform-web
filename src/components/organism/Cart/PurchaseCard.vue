<template>
  <div class="flex justify-between items-center p-3 border-2 mb-2 rounded-md">
    <!-- rectangular card -->
    <div class="flex items-center">
      <div class="w-32">
        <!-- <Images :src="productPhotos" /> -->
        <img :src="post.photos[0]" />
      </div>
      <div class="ml-3 text-left">
        <p>Product Name:</p>
        <p>{{ post.name }}</p>
        <!-- <div>
      Product Description
      </div> -->
      </div>
    </div>
    <div class="text-left">
      <p>Price:</p>
      <p>{{ post.points }} points</p>
    </div>
    <div>Quantity: {{ post.desireQuantity  }}</div>
    <div class="text-left">
      <p>Total cost:</p>
      <p>{{ post.totalPoints }} points</p>
    </div>
    <!-- <div class="px-3">
      <button
        class="hover:text-red-700 transform transition ease-linear duration-200"
        @click="removepost"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-trash w-7"
          viewBox="0 0 16 16"
        >
          <path
            d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
          />
          <path
            fill-rule="evenodd"
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
          />
        </svg>
      </button>
    </div> -->
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue";
import Images from "../../molecule/Image/Image.vue";
export default {
  components: { Images, Button },
  props: ["post"],
};
</script>

<style></style>
