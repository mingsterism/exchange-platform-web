<template>
  <div class="flex flex-col items-start mt-5 ml-3">
    <label for="customRange1" class="form-label text-black">Price range</label>
    <input
      type="range"
      class="h-7 max-w-md bg-black"
      :min="minPoints"
      :max="maxPoints"
      id="customRange2"
    />
  </div>
</template>

<script>
export default {
  name: "Slider",
  props: {
    minPoints: {
      type: Number,
      required: true,
    },
    maxPoints: {
      type: Number,
      required: true,
    },
  },
};
</script>

<style scoped></style>
