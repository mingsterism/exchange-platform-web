<template>
  <!--  <button></button>-->
  <!--  <input type="checkbox" id="" name="" value=""/>-->
  <div className="flex flex-col m-3">
    <label for="customRange1" class="form-label">Minimum Points Required</label>
    <input type="range" class="form-range" min="0" max="100" id="customRange2">
  </div>
</template>

<script>
export default {
  name: "Slider"
}
</script>

<style scoped>

</style>
