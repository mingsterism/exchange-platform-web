<template>
  <div class="flex flex-col items-center">
    <label for="name" class="text-gray-600 mt-3 h-auto w-52 text-left">{{ text }}</label>
    <input class="border-4 border-gray-400 rounded-lg p-1.5" type="text" placeholder="Name" id="name">
  </div>

</template>

<script>
export default {
  name: "Textbox",

  props: {
    text: {
      type: String,
      required: true,
    }
  }
}
  
</script>

<style scoped>

</style>