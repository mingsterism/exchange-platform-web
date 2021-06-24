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
        <Button type="submit" @click="handleLogin" label="Login" :primary="true" size="medium"/>
        <p className="mt-8">Need an Account?
          <router-link to="/register">Register Here</router-link>
        </p>
        <p className="mt-2">Forgot Your Password?
          <router-link to="/forgotpass">Click Here</router-link>
          <!-- <router-link to="/register">Click Here</router-link> -->
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Textbox from "/@/components/molecule/Textbox/Textbox.vue"
import Button from "/@/components/molecule/Button/Button.vue"
import {login, forgotPassword} from '/@/utils/firebase.js'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
      if (!isLoggedIn) {
        this.$router.push('/login')
      } else {
        Swal.fire({

                title: "You Have Logged In!",
                icon: "success",
                confirmButtonColor: "#1ea7fd"

            }).then((result) => {
                if (result.isConfirmed) {
                    this.$router.push('/')
                }
            })
      }
    }
  }
}
</script>
<style scoped>

</style>
