<template>
  <div class="rounded-md border overflow-hidden relative bg-white">
    <button
      @click="removePhoto"
      class="absolute right-2 top-2 text-white hover:text-red-600"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-trash-fill h-3 md:h-4"
        viewBox="0 0 16 16"
      >
        <path
          d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
        />
      </svg>
    </button>
    <img class="h-36 w-36 overflow-hidden" :src="srcImg" />
  </div>
</template>
<script>
export default {
  name: "Image",
  props: {
    srcImg: {
      type: String,
      default: "https://pbs.twimg.com/profile_images/1176237957851881472/CHOXLj9b_400x400.jpg"
    }
  },
  methods: {
    removePhoto() {
    //   console.log("fire remove event...");
      this.$emit("pop-product-img");
    //   console.log("after....");
    },
  },
};
</script>
<style scoped></style>
