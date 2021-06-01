<template>
  <!--  <img alt="Vue logo" src="./assets/logo.png"/>-->
  <div>
    <Card />
    <NavBar />
    <Textbox />
    <Slider />
    <Checkbox />
  </div>
</template>

<script>
import NavBar from "/@/components/organism/NavBar/NavBar.vue"
import Card from "/@/components/organism/Card/Card.vue"
import ProfileCard from "/@/components/organism/ProfileCard/ProfileCard.vue"
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Slider from '/@/components/molecule/Slider/Slider.vue'
import Checkbox from '/@/components/molecule/Checkbox/Checkbox.vue'

export default {
  name: "App",
  components: {
    Card,
    NavBar,
    ProfileCard,
    Textbox,
    Slider,
    Checkbox
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