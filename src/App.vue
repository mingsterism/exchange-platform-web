<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png"/>-->
  <div>
    <ProfileCard />
    <NavBar />
    <Textbox />
  </div>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue"
import Card from "/@/components/organism/Card/Card.vue"
import ProfileCard from "/@/components/organism/ProfileCard/ProfileCard.vue"
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"

export default {
  name: "App",
  components: {
    Card,
    NavBar,
    ProfileCard,
    Textbox
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
