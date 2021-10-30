<template>
  <div>
    <div class="mb-5">
      <h1 class="text-3xl text-left font-semibold">Purchase History</h1>
    </div>
    <div
      v-if="!purchase"
      class="flex flex-wrap items-start gap-10 border-2 p-2"
    >
      <h1>Currently there is no transaction.</h1>
    </div>
    <div class="flex flex-col" v-else>
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
import PurchaseCard from "../components/Cards/PurchaseCard.vue";
import { usersStore } from "../store/user.store";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "MyPurchase",
  components: { PurchaseCard },
  setup() {
    const store = usersStore();

    firebase.auth().onAuthStateChanged(async(user) => {
      const uid = user.uid;
      await store.getMyPurchasedItems(uid);
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
