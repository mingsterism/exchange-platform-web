<template>
  <div>
    <div v-if="isEmpty" class="border rounded-md p-2">
      <h1>Currently there is no product here.</h1>
    </div>
    <div className="flex flex-wrap gap-9 mb-10">
      <transition-group name="card">
        <Card
          :post="post"
          v-for="(post, index) in myProducts"
          :key="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue";
import { userProduct } from "../store/user.product.js";
import { computed } from '@vue/runtime-core';


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
    const store = userProduct()
    store.displayUserProduct()
    const myProducts = computed(() => store.getProductDisplay)
    const isEmpty = computed(() => store.getEmptyStatus)

    return { store, myProducts, isEmpty }
  },
};
</script>

<style scoped>
.card-enter-from {
  transform: scale(0);
}

.card-enter-active {
  transition: all 2s ease;
}
</style>
