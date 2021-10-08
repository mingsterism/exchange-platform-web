<template>
  <div class="flex flex-col justify-between min-h-full screenHeight">
    <div>
      <NavBar class="sticky top-0 z-20" />
      <router-view></router-view>
    </div>
    <Footer class="footer" />
  </div>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue";
import Footer from "/@/components/organism/Footer/Footer.vue";
export default {
  name: "NavLayout",
  components: {
    NavBar,
    Footer,
  },
};
</script>

<style scoped>
/* body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
} */

/* .footer {
  flex: 0 0 50px; 
  margin-top: auto;
} */
.screenHeight {
  min-height: 100vh;
}
</style>
