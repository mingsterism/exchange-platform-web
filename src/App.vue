<template>
  <router-view></router-view>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue"
import Card from "/@/components/organism/Card/Card.vue"
import ProfileCard from "/@/components/organism/ProfileCard/ProfileCard.vue"
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Slider from '/@/components/molecule/Slider/Slider.vue'
import Checkbox from '/@/components/molecule/Checkbox/Checkbox.vue'
import Login from '/@/pages/Login.vue'

export default {
  name: "App",
  components: {
    Card,
    NavBar,
    ProfileCard,
    Textbox,
    Slider,
    Checkbox,
    Login
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