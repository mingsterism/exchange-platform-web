<template>
  <div>
    <div class="mb-5">
      <h1 class="text-3xl text-left font-semibold">My Product</h1>
    </div>
    <div v-if="isEmpty" class="border rounded-md p-2">
      <h1>Currently there is no product here.</h1>
    </div>
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-10">
      <transition-group name="card">
        <ProductCard :item="item" v-for="(item, index) in myProducts" :key="index" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import ProductCard from "/@/components/Cards/ProductCard.vue";
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
    ProductCard,
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
