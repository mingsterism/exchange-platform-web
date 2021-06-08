<template>
    <NavBar />
    <router-view></router-view>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue";
export default {
  name: "NavLayout",
  components: {
    NavBar
  }

}
</script>

<style scoped>

</style>
