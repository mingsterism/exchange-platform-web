<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png"/>-->
  <div>
<!--    <ProfileCard />-->
<!--    <NavBar />-->
<!--    <Textbox />-->
<!--    <Slider />-->
<!--    <Checkbox />-->
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue"
import Card from "/@/components/organism/Card/Card.vue"
import ProfileCard from "/@/components/organism/ProfileCard/ProfileCard.vue"
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Slider from '/@/components/molecule/Slider/Slider.vue'
import Checkbox from '/@/components/molecule/Checkbox/Checkbox.vue'
import LoginPage from '/@/pages/login/LoginPage.vue'

export default {
  name: "App",
  components: {
    Card,
    NavBar,
    ProfileCard,
    Textbox,
    Slider,
    Checkbox,
    LoginPage
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
  margin: 0px;
  padding: 0px
}
</style>