<template>
  <img alt="Vue logo" src="./assets/logo.png"/>
  <div>
    <Card />
    <Textbox />
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue"
import Textbox from "/@/components/molecule/TextBox/TextBox.vue"


export default {
  name: "App",
  components: {
    Card,
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
