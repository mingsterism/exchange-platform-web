<template>
  <h1>testPage</h1>
  <button @click="handleClick">GO TO Test 2</button>
</template>

<script>
export default {
  name: "Test.page.vue",
  methods: {
    handleClick() {
      this.$router.go("/test2")
    }
  }
}
</script>

<style scoped>

</style>