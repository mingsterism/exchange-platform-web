<template>
    <div class="flex flex-col items-center h-screen justify-center">
    <h1 class="text-xl font-black">Reset Password</h1>
    <div>
      <div class="mt-8">
        <div className="flex flex-col">
          <label for="email" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">Email</label>
          <input type="text" placeholder="Email" className="storybook-textbox" v-model="email"/>
        </div>
      </div>
      <div class="mt-10">
        <Button type="submit" @click="handlePass" label="Request" :primary="true" size="medium"/>
        <p className="mt-8">Need an Account?
          <router-link to="/register">Register Here</router-link>
        </p>
        <p className="mt-2">Have an Account?
          <router-link to="/login">Login Here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import Button from '/@/components/molecule/Button/Button.vue'
import {forgotPassword} from '/@/utils/firebase'
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

export default {
    name: "ForgotPass",
    components: {
        Button
    },
    data() {
        return {
        email: "",
        }
    },
    methods: {
        async handlePass() {
            await forgotPassword(this.email).then(() => {
                Swal.fire({
                    title: "Email Sent!",
                    text: "Please check your registered email to continue your account retrevial process",
                    icon: "success",
                    confirmButtonColor: "#1ea7fd"
                })
            }).catch(err => Swal.fire({
                title: "Oh No!",
                text: err.message,
                icon: "error",
                confirmButtonColor: "#1ea7fd"
            }))
        }
    }
}
</script>

<style scoped>

</style>
