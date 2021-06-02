<template>
  <h1>Test Page</h1>
  <button
      @click="handleClick"
      class="bg-yellow-300"
  >GO TO Test 2</button>
</template>

<script>
export default {
  name: "Test.page.vue",
  methods: {
    handleClick() {
      this.$router.push("/test2")
    }
  }
}
</script>

<style scoped>

</style>