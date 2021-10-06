<template>
  <nav class="bg-white shadow dark:bg-gray-800">
    <div class="container px-6 py-4 mx-auto">
      <div class="relative md:flex md:items-center md:justify-between">
        <div class="flex flex-1 items-center justify-center">
          <div class="text-xl font-semibold text-gray-700">
            <router-link
              class="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
              to="/"
              >EP.</router-link
            >
          </div>

          <!-- Mobile menu button -->
          <!-- <div class="flex md:hidden">
            <button
              type="button"
              class="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
              aria-label="toggle menu"
              @click="
                !userMenuShown
                  ? (userMenuShown = true)
                  : (userMenuShown = false)
              "
            >
              <svg viewBox="0 0 24 24" class="w-6 h-6 fill-current">
                <path
                  fill-rule="evenodd"
                  d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                ></path>
              </svg>
            </button>
            <UserMenu v-if="userMenuShown" />
          </div> -->
        </div>

        <!-- Mobile Menu open: "block", Menu closed: "hidden" -->
        <div
          class="absolute -right-0 md:flex md:items-center md:justify-between"
        >
          <!-- <div class="flex flex-col -mx-4 md:flex-row md:items-center md:mx-8">
            <router-link
              v-if="!isLogin"
              to="/login"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >Login</router-link
            >
            <router-link
              v-if="!isLogin"
              to="/register"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >Register</router-link
            >
            <router-link
              v-if="isLogin"
              to="/Profile"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >Profile</router-link
            >
            <router-link
              v-if="isLogin"
              to="/"
              class="px-2 py-1 mx-2 mt-2 text-sm font-medium text-gray-700 transition-colors duration-200 transform rounded-md md:mt-0 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700"
              >About</router-link
            >
          </div> -->

          <div
            v-if="isLogin"
            class="md:flex flex-col items-center md:flex-row mt-4 md:mt-0"
          >
            <div class="flex justify-center md:block">
              <router-link
                class="relative mx-4 text-gray-600 md:block dark:text-gray-200 hover:text-gray-700 dark:hover:text-gray-400 focus:text-gray-700 dark:focus:text-gray-400 focus:outline-none"
                to="/cart"
              >
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 3H5L5.4 5M7 13H17L21 5H5.4M7 13L5.4 5M7 13L4.70711 15.2929C4.07714 15.9229 4.52331 17 5.41421 17H17M17 17C15.8954 17 15 17.8954 15 19C15 20.1046 15.8954 21 17 21C18.1046 21 19 20.1046 19 19C19 17.8954 18.1046 17 17 17ZM9 19C9 20.1046 8.10457 21 7 21C5.89543 21 5 20.1046 5 19C5 17.8954 5.89543 17 7 17C8.10457 17 9 17.8954 9 19Z"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span
                  class="absolute top-0 left-0 p-1 text-xs text-white bg-indigo-500 rounded-full"
                ></span>
              </router-link>
            </div>
            <button
              type="button"
              class="flex items-center border-2 border-opacity-40 py-1 px-2 rounded-full hover:shadow-md focus:outline-none"
              aria-label="toggle profile dropdown"
              @click="!show ? (show = true) : (show = false)"
            >
              <div
                class="w-8 h-8 overflow-hidden border-2 border-gray-400 rounded-full"
              >
                <img
                  :src="profileImg"
                  class="object-cover w-full h-full"
                  alt="avatar"
                />
              </div>

              <h3
                class="mx-2 text-sm font-medium text-gray-700 dark:text-gray-200"
              >
                Hi, {{ firstName }}
              </h3>
              <svg
                class="w-5 h-5 text-gray-800 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
            <!-- <div
              v-if="show"
              class="absolute shadow-lg rounded-lg bg-white w-60 -ml-40 mt-20"
            >
              <Button
                label="Logout"
                v-on:click="logout"
                className="border-opacity-0 font-semibold pb-2"
              />
            </div> -->
            <div
              v-if="show"
              class="absolute right-0 top-10 z-20 w-48 py-2 mt-2 text-left bg-white rounded-md shadow-xl dark:bg-gray-800"
            >
              <router-link
                to="/profile"
                class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                View Profile
              </router-link>
              <router-link
                to="/user/my-product"
                class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                My Products
              </router-link>
              <router-link
                to="/user/my-purchase"
                class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Purchase History
              </router-link>
              <router-link
                to="/user/add-product"
                class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Add Products
              </router-link>
              <a
                @click="logout"
                type="button"
                class="block px-4 py-3 text-sm text-gray-600 capitalize transition-colors duration-200 transform dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                Sign Out
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
// import Button from "/@/components/molecule/Button/Button.vue";
import firebase from "firebase";
// import UserMenu from "/@/components/molecule/UserMenu/UserMenu.vue";
import { userProfile } from "/@/store/user.profile";
import { onBeforeMount } from "@vue/runtime-core";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "NavBar",
  // components: {
  //   UserMenu,
  //   Button,
  // },
  data() {
    return {
      userMenuShown: false,
      show: false,
    };
  },
  computed: {
    profileImg() {
      return userProfile().getProfilePic;
    },
    isLogin() {
      return userProfile().getIsLogin;
    },
    firstName() {
      return userProfile().getFirstName;
    },
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.show = false;
          Swal.fire({
            title: "You Have Logged Out!",
            icon: "success",
            confirmButtonColor: "#1ea7fd",
          });
          this.store.$reset();
          this.$router.push("/login");
        })
        .catch((err) => {
          Swal.fire({
            title: "Uh Oh!",
            text: err.message,
            icon: "error",
            confirmButtonColor: "#1ea7fd",
          });
        });
    },
  },
  setup() {
    const store = userProfile();
    store.getProfileImg();
    store.getProfile();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          store.changeIsLogin(true);
        } else {
          store.changeIsLogin(false);
        }
      });
    });

    return { store };
  },
};
</script>

<style scoped></style>
