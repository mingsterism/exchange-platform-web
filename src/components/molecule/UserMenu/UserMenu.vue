<template>
  <div className="absolute shadow-lg rounded-lg bg-white w-60 -ml-52 mt-10">
    <div className="pt-1">
      <div className="flex flex-col h-32 justify-around font-semibold pt-2 pb-2">
        <router-link v-if="isLogin" to="/">Home</router-link>
        <router-link v-if="isLogin" to="/profile">Profile</router-link>
        <router-link v-if="!isLogin" to="/profile">Cart</router-link>
        <router-link v-if="!isLogin" to="/login">Login</router-link>
        <router-link v-if="!isLogin" to="/register">Register</router-link>
      </div>
      <Button
        v-if="isLogin"
        label="Logout"
        v-on:click="logout"
        className="border-opacity-0 font-semibold pb-2"
      />
    </div>
  </div>
</template>

<script>
import Button from "/@/components/molecule/Button/Button.vue";
import firebase from "firebase";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { userProfile } from "/@/store/user.profile";
import { computed } from "@vue/runtime-core";

export default {
  name: "UserMenu",
  components: {
    Button,
  },
  methods: {
    logout: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          Swal.fire({
            title: "You Have Logged Out!",
            icon: "success",
            confirmButtonColor: "#1ea7fd",
          });
          this.user.$reset();
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
    const user = userProfile();
    const isLogin = computed(() => {
      return user.getIsLogin;
    });
    return { user, isLogin };
  },
};
</script>

<style scoped></style>
