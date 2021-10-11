<template>
  <div>
    <div
      v-if="!purchase"
      class="flex flex-wrap items-start gap-10 border-2 p-2"
    >
      <h1>Currently there is no transaction.</h1>
    </div>
    <div class="flex-1 md:flex md:flex-wrap gap-x-3 pl-1" v-else>
      <!-- My purchases card -->
      <PurchaseCard
        :post="item"
        v-for="(item, index) in purchasedItem"
        :key="index"
      />
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/runtime-core";
import PurchaseCard from "../components/organism/Cart/PurchaseCard.vue";
import { usersStore } from "../store/users.store";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "MyPurchase",
  components: { PurchaseCard },
  setup() {
    const store = usersStore();

    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      store.getMyPurchasedItems(uid);
    });

    const purchasedItem = computed(() => {
      return store.getMyPurchase;
    });
    const purchase = computed(() => {
      return store.getHasPurchase;
    });

    return { purchasedItem, purchase };
  },
};
</script>

<style scoped>
.fade-in-enter-from {
  opacity: 0;
  transform: translateX(-60px);
}

.fade-in-enter-active {
  transition: all 1s ease;
}
</style>
