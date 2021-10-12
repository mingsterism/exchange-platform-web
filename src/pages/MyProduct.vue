<template>
  <div>
    <div v-if="isEmpty" class="border rounded-md p-2">
      <h1>Currently there is no product here.</h1>
    </div>
    <div className="grid grid-cols-2 xl:flex flex-wrap gap-2 md:gap-6 mb-10">
      <transition-group name="card">
        <Card :post="post" v-for="(post, index) in myProducts" :key="index" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue";
import { userProduct } from "../store/user.product.js";
import { computed } from "@vue/runtime-core";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "MyPurchase",
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
  components: {
    Card,
  },
  setup() {
    const store = userProduct();
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      store.displayUserProduct(uid);
    });
    const myProducts = computed(() => store.getProductDisplay);
    const isEmpty = computed(() => store.getEmptyStatus);

    return { store, myProducts, isEmpty };
  },
};
</script>

<style scoped>
/* .card-enter-from {
  transform: scale(0);
}

.card-enter-active {
  transition: all 0.5s ease;
} */
</style>
