<template>
  <div>
    <div v-if="store.emptyStatus" class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2 mb-20">
      <h1>Currently there is no product here.</h1>
    </div>
    <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly mb-10">
      <transition-group name="card">
        <Card
          :post="post"
          v-for="(post, index) in store.productDisplay"
          :key="index"
        />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue";
import { userProduct } from "../store/user.product.js";


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
    const displayProduct = store.displayUserProduct

    return { store, displayProduct }
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
