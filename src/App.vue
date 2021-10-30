<template>
  <router-view></router-view>
</template>

<script>
import { onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";
import firebase from "firebase";

export default {
  name: "App",
  setup() {
    const router = useRouter();
    const route = useRoute();

    onBeforeMount(() => {
      firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
          if (
            route.path === "/auth/login" ||
            route.path === "/auth/register" ||
            route.path === "/auth/forgotpass"
          ) {
            return
          }
          router.replace("/auth/login");
        } else if (
          route.path === "/auth/login" ||
          route.path === "/auth/register" ||
          route.path === "/auth/forgotpass"
        ) {
          router.replace("/");
        }
      });
    });
  },
};
</script>

<style lang="scss">
.blueTxt {
  color: $purple;
}
</style>
