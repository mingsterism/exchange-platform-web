<template>
  <div class="px-2 md:px-20 pt-10 pb-10">
    <div class="pb-2 md:pb-6">
      <p class="text-3xl text-left font-semibold pl-3 md:pl-6 mb-3">
        Market Place
      </p>
    </div>
    <div className="flex flex-col md:flex-row">
      <!-- <div class="mr-3">
        <FilterBox />
      </div> -->
      <div v-if="loading" class="flex items-center justify-center z-40 inset-0 w-screen h-screen bg-gray-500 bg-opacity-50 absolute">
        <svg viewBox="0 0 50 50" class="spinning">
          <circle class="ring" cx="25" cy="25" r="20"></circle>
          <circle class="ball" cx="25" cy="5" r="3.5"></circle>
        </svg>
      </div>
      <div
        v-else
        class="flex-1 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-2 md:gap-y-10 lg:gap-7 justify-items-center"
      >
        <Card2
          :post="post"
          v-for="(post, index) in productShowcase"
          :key="index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
// import FilterBox from "/@/components/organism/FilterBox/FilterBox.vue";
import Card2 from "/@/components/organism/Card/Card2.vue";
import { usersStore } from "../store/users.store";
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Home",
  components: {
    // FilterBox,
    Card2,
  },
  setup() {
    const store = usersStore();

    // * fetch all other user's products except current user
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const uid = user.uid;
        store.displayAllProducts(uid);
      }
    });

    const loading = computed(() => store.getLoading);
    const productShowcase = computed(() => store.getAllProducts);

    return { store, productShowcase, loading };
  },
};
</script>

<style>
.spinning {
  width: 3.75em;
  animation: 1.5s spin ease infinite;
}

.ring {
  fill: none;
  stroke: #000000;
  stroke-width: 2;
}

.ball {
  fill: #000000;
  stroke: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
