<template>
  <h1>Test2 page</h1>
  <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button>
</template>

<script>
export default {
  name: "Test2.page.vue",
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
