<template>
  <div class="py-44">
    <div
      class="w-full max-w-sm p-6 m-auto bg-white rounded-md shadow-md dark:bg-gray-800"
    >
      <h1
        class="text-3xl font-semibold text-center text-gray-700 dark:text-white"
      >
        Reset Password
      </h1>

      <form class="mt-6">
        <div>
          <label
            for="username"
            class="flex text-sm text-gray-800 dark:text-gray-200"
            >Email</label
          >
          <input
            type="text"
            placeholder="email"
            v-model="email"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div class="mt-6">
          <button
            type="submit"
            @click="handlePass"
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Request New Password
          </button>
        </div>
      </form>

      <p class="mt-5 text-xs font-light text-center text-gray-400">
        Have an account?
        <router-link
          to="/login"
          class="font-medium text-gray-700 dark:text-gray-200 hover:underline"
          >Login here</router-link
        >
      </p>

      <p class="mt-3 text-xs font-light text-center text-gray-400">
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
// import Button from "/@/components/molecule/Button/Button.vue";
import { forgotPassword } from "/@/utils/auth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "ForgotPass",
  // components: {
  //   Button,
  // },
  data() {
    return {
      email: "",
    };
  },
  methods: {
    async handlePass() {
      await forgotPassword(this.email)
        .then(() => {
          Swal.fire({
            title: "Email Sent!",
            text:
              "Please check your registered email to continue your account retrevial process",
            icon: "success",
            confirmButtonColor: "#1ea7fd",
          });
        })
        .catch((err) =>
          Swal.fire({
            title: "Oh No!",
            text: err.message,
            icon: "error",
            confirmButtonColor: "#1ea7fd",
          })
        );
    },
  },
};
</script>
