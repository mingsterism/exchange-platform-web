<template>
  <div>
    <div className="text-left p-10 pt-24 pl-14">
      <p className="text-5xl font-semibold">MarketPlace</p>
    </div>
    <div className="flex flex-col md:flex-row">
      <div className="pl-11">
        <FilterBox />
      </div>
      <div className="px-20 pb-10 flex flex-wrap gap-9 justify-evenly">
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
import { computed, onBeforeMount } from "vue";
import FilterBox from "/@/components/organism/FilterBox/FilterBox.vue";
import Card2 from "/@/components/organism/Card/Card2.vue";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { usersStore } from "../store/users.store";

export default {
  name: "Home",
  components: {
    FilterBox,
    Card2,
  },
  methods: {
    handleClick() {
      this.$router.push("/profile");
    },
  },
  setup() {
    onBeforeMount(() => {
      const route = new URLSearchParams(window.location.search);

      if (route.get("success")) {
        Swal.fire({
          title: "Payment Success",
          text: "You may continue shopping :D",
          icon: "success",
          confirmButtonColor: "#1ea7fd",
        });
      }
    });

    const store = usersStore();

    // * fetch all other user's products except user
    store.displayAllProducts();
    const productShowcase = computed(() => store.getApparels);

    return { store, productShowcase };
  },
};
</script>

<style scoped></style>
