<template>
  <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl font-black">Login</h1>
    <div>
      <div class="mt-8">
        <div className="flex flex-col">
          <label for="email" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Email</label>
          <input type="text" placeholder="Email" className="storybook-textbox" v-model="email"/>
        </div>
        <div className="flex flex-col">
          <label for="password" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Password</label>
          <input type="password" placeholder="Password" className="storybook-textbox" v-model="password"/>
        </div>
        <!-- <Textbox type="text" text="Email" name="Email" model="email" id="email" />
        <Textbox type="password" text="Password" name="Password" model="password" id="password" /> -->
      </div>
      <div class="mt-10">
        <Button type="submit" @click="login" label="Login" :primary="true" size="medium"/>
        <p className="mt-8">Need an Account?
          <router-link to="/register">Register Here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"
import {ref} from 'vue';
import {login} from '/@/utils/firebase.js'

export default {
  name: "Login",
  components: {
    Textbox,
    Button
  },
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async handleLogin() {
      const isLoggedIn = await login(this.email, this.password).catch(err => alert(err.message))
      this.$router.push('/')

    }
  }
}
</script>
<style scoped>

</style>
