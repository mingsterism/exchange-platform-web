<template>
    <NavBar />
    <router-view></router-view>
    <Footer />
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue";
import Footer from '/@/components/organism/Footer/Footer.vue';
export default {
  name: "NavLayout",
  components: {
    NavBar,
    Footer
  }

}
</script>

<style scoped>

</style>
