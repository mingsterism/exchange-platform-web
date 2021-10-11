<template>
  <div class="py-20">
    <div
      class="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <h1
        class="text-3xl font-semibold text-center text-gray-700 dark:text-white"
      >
        Exchange Platform
      </h1>

      <form class="mt-6">
        <div>
          <label
            for="email"
            class="block text-sm text-left text-gray-800 dark:text-gray-200"
            >Email</label
          >
          <input
            type="text"
            placeholder="Email"
            v-model="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div class="mt-4">
          <div class="flex items-center justify-between">
            <label
              for="password"
              class="block text-sm text-gray-800 dark:text-gray-200"
              >Password</label
            >
            <router-link
              to="/forgotpass"
              class="text-xs text-gray-600 dark:text-gray-400 hover:underline"
              >Forget Password?</router-link
            >
          </div>

          <input
            type="password"
            v-model="password"
            @keypress.enter="handleLogin"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div class="mt-6">
          <button
            type="button"
            @click="handleLogin"
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Login
          </button>
        </div>
      </form>

      <div class="flex items-center justify-between mt-4">
        <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/5"></span>

        <a
          href="#"
          class="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
          >or login with Social Media</a
        >

        <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/5"></span>
      </div>

      <div class="flex items-center mt-6 -mx-2">
        <button
          type="button"
          @click="loginWithGoogle"
          class="flex items-center justify-center w-full px-6 py-2 mx-2 text-sm font-medium text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:bg-blue-400 focus:outline-none"
        >
          <svg class="w-4 h-4 mx-2 fill-current" viewBox="0 0 24 24">
            <path
              d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
            ></path>
          </svg>

          <span class="hidden mx-2 sm:inline">Sign in with Google</span>
        </button>
      </div>

      <p class="mt-8 text-xs font-light text-center text-gray-400">
        Don't have an account?
        <router-link
          to="/register"
          class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >Create One</router-link
        >
      </p>
    </div>
  </div>
</template>

<script>
// import Textbox from "/@/components/molecule/Textbox/Textbox.vue";
// import Button from "/@/components/molecule/Button/Button.vue";
import { login } from "/@/utils/auth.js";
import { signInWithGoogle } from "../utils/auth.google";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "Login",
  // components: {
  //   Textbox,
  //   Button,
  // },
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    handleLogin() {
      if (this.email === "" || this.password === "") {
        Swal.fire({
          icon: "error",
          title: "Please key in your email and password",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      login(this.email, this.password)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Welcome",
            showConfirmButton: false,
            timer: 1500,
          });
          // this.store.setIsLogin(true);
          this.$router.push("/");
        })
        .catch((err) =>
          Swal.fire({
            title: "Uh Oh!",
            text: err.message,
            icon: "error",
            confirmButtonColor: "#1ea7fd",
          })
        );
      // if (!isLoggedIn) {
      //   this.$router.push("/login");
      // }
    },
    async loginWithGoogle() {
      console.log("Logging in using google account...");
      const googleAcc = await signInWithGoogle();
      Swal.fire({
        icon: "success",
        title: "Welcome",
        showConfirmButton: false,
        timer: 1500,
      });
      // this.store.setIsLogin(true);
      this.$router.push("/");
    },
  },
};
</script>
<style lang="scss">
body {
  background-color: $light;
}
</style>
