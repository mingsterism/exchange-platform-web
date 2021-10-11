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

        <div class="mt-4">
          <div class="flex items-center">
            <label
              for="password"
              class="block text-sm text-gray-800 dark:text-gray-200"
              >Password</label
            >
          </div>
          <input
            type="password"
            v-model="password"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div class="mt-4">
          <div class="flex items-center">
            <label
              for="retype-password"
              class="block text-sm text-gray-800 dark:text-gray-200"
              >Retype Password</label
            >
          </div>
          <input
            type="password"
            v-model="retype"
            @keypress.enter="register"
            class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"
          />
        </div>

        <div class="mt-6">
          <button
            type="button"
            @click="register"
            class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
          >
            Register
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
    </div>
  </div>
</template>
<script>
// import Textbox from "/@/components/molecule/Textbox/Textbox.vue";
// import Button from "/@/components/molecule/Button/Button.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { createAcc } from "../utils/auth";

export default {
  name: "Register",
  // components: {
  //   Textbox,
  //   Button,
  // },
  data() {
    return {
      email: "",
      password: "",
      retype: "",
      // userName: "",
    };
  },
  methods: {
    async register() {
      if (this.email === "" || this.password === "" || this.retype === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please enter all the infomation required.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.password === this.retype) {
        // const firebaseAuth = firebase.auth();
        console.log("creating user now...");
        createAcc(this.email, this.password);
      } else {
        Swal.fire({
          title: "Uh Oh!",
          text: "Password does not match. Please try again.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
      }
    },
  },
};
</script>

<style lang="css" scoped>
.storybook-textbox {
  border-width: 4px;
  --tw-border-opacity: 1;
  border-color: rgba(156, 163, 175, var(--tw-border-opacity));
  border-radius: 0.5rem;
  padding: 0.375rem;
}
</style>
