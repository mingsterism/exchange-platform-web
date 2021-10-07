<template>
  <div class="px-20 pt-20 pb-24">
    <div class="pb-6">
      <p class="text-3xl text-left font-semibold pl-6 mb-3">Market Place</p>
    </div>
    <div className="flex flex-col md:flex-row">
      <!-- <div class="mr-3">
        <FilterBox />
      </div> -->
      <div class="flex-1 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-y-10 lg:gap-7 justify-items-center">
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
// import Swal from "sweetalert2";
// import "sweetalert2/dist/sweetalert2.min.css";
import { usersStore } from "../store/users.store";

export default {
  name: "Home",
  components: {
    // FilterBox,
    Card2,
  },
  methods: {
    handleClick() {
      this.$router.push("/profile");
    },
  },
  setup() {
    // onBeforeMount(() => {
    //   const route = new URLSearchParams(window.location.search);

    //   if (route.get("success")) {
    //     Swal.fire({
    //       title: "Payment Success",
    //       text: "You may continue shopping :D",
    //       icon: "success",
    //       confirmButtonColor: "#1ea7fd",
    //     });
    //   }
    // });

    const store = usersStore();

    // * fetch all other user's products except user
    store.displayAllProducts();
    const productShowcase = computed(() => store.getApparels);

    return { store, productShowcase };
  },
};
</script>

<style scoped></style>
