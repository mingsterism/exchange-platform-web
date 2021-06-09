<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl font-black">Login</h1>
    <div class="mt-8">
      <Textbox text="Email" name="Some placeholder"/>
      <Textbox text="Password"/>
    </div>
    <div class="mt-10">
      <Button label="Login" :primary="true" size="medium" @click="clickToHome"/>
    </div>
  </div>
</template>

<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"
import isAuthenticated from "../mixins/mixins";

export default {
  name: "Login",
  components: {
    Textbox,
    Button
  },
  mixins: [isAuthenticated],
  methods: {
    clickToHome() {
      if (isAuthenticated()) {
        this.$router.push("/home")
      } else {
        this.$router.push("/login")
      }
    },
  }
}
</script>
<style scoped>

</style>