<template>
  <nav className="bg-gray-300 p-5 flex flex-row justify-between">
    <div @click="check">
      <img :src="profileImg" className="h-11 cursor-pointer" />
    </div>
    <div className="flex flex-row items-center gap-4">
      <Button
        label="Cart"
        @click="goToCart"
        className="border-opacity-0 font-semibold"
      />
      <Button label="Messages" className="border-opacity-0 font-semibold" />
      <div @click="ifUserMenu">
        <img
          :src="profileImg"
          className="rounded-full h-11 w-11 cursor-pointer"
        />
        <UserMenu v-if="userMenuShown" />
      </div>
    </div>
  </nav>
</template>

<script>
import Button from "/@/components/molecule/Button/Button.vue";
import firebase from "firebase";
import UserMenu from "/@/components/molecule/UserMenu/UserMenu.vue";
import { userProfile } from "/@/store/user.profile";

export default {
  name: "NavBar",
  components: {
    Button,
    UserMenu,
  },
  data() {
    return {
      userMenuShown: false,
    };
  },
  computed: {
    profileImg() {
      return userProfile().getProfilePic;
    },
  },
  methods: {
    check: async function () {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.$router.push("/");
        } else {
          this.$router.push("/login");
        }
      });
    },
    ifUserMenu: async function () {
      await firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.userMenuShown = !this.userMenuShown;
        } else {
          this.userMenuShown = false;
          this.$router.push("/login");
        }
      });
    },
    goToCart() {
      this.$router.push("/cart");
    },
  },
};
</script>

<style scoped></style>
