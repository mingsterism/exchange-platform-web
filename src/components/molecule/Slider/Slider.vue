<template>
  <!--  <button></button>-->
  <!--  <input type="checkbox" id="" name="" value=""/>-->
  <div class="flex flex-col items-start mt-5 ml-3">
    <label for="customRange1" class="form-label text-black">Minimum Points Required</label>
    <input type="range" class="h-7 w-3/12 bg-black" min="0" max="100" id="customRange2">
  </div>
</template>

<script>
export default {
  name: "Slider"
}
</script>

<style scoped>

</style>
