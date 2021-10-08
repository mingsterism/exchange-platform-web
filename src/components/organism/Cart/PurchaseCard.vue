<template>
  <div
    class="flex justify-between items-center py-2 px-3 border mb-2 rounded-md bg-white shadow-md w-full"
  >
    <!-- rectangular card -->
    <div class="flex items-start">
      <div class="w-24 md:w-28 max-h-28 overflow-hidden">
        <img :src="post.photos[0]" />
      </div>
      <div class="ml-2 text-left">
        <p class="lg:text-lg font-semibold">{{ post.name }}</p>

        <!-- <p class="text-xs xl:text-sm">{{ post.points }} points</p> -->
        <p class="text-sm xl:text-base tracking-tight">x {{ post.desireQuantity }}</p>
        <!-- <p class="text-xs xl:text-sm mt-1">
          Total cost: {{ post.totalPoints }} points
        </p> -->
        <!-- <p class="text-xs xl:text-sm mt-1">{{ post.totalPoints }} points</p> -->
      </div>
    </div>
    <div class="flex flex-col items-start pr-3">
      <p class="text-xs xl:text-base mt-1">Total cost:</p>
      <p class="text-xs xl:text-base mt-1">{{ post.totalPoints }} points</p>
    </div>
  </div>
</template>

<script>
// import Button from "../../molecule/Button/Button.vue";
// import Images from "../../molecule/Image/Image.vue";
export default {
  // components: { Images, Button },
  props: ["post"],
};
</script>

<style></style>
