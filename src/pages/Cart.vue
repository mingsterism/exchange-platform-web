<template>
  <div class="flex justify-center py-10 md:py-14">
    <div class="w-10/12 md:w-9/12 lg:w-8/12 xl:w-5/12">
      <div class="mb-3">
        <h1 class="text-2xl text-left font-semibold">Shopping Cart</h1>
        <div class="h-px bg-black"></div>
      </div>
      <div>
        <!-- Cart cards -->
        <CartCard :post="item" v-for="(item, id) in cartItems" :key="id" />
      </div>
      <div class="flex flex-col items-end mt-8">
        <!-- checkout footer -->
        <div class="mb-2">
          <p class="md:text-lg font-medium">Total Price: {{ total }} points</p>
        </div>
        <div>
          <!-- <Button
            class="ml-5 transform hover:scale-110 hover:opacity-75 transition ease-out duration-300"
            type="button"
            @click="checkOut"
            label="Check Out"
            :primary="true"
          /> -->
          <button
            @click="checkOut"
            type="button"
            class="px-4 py-2 text-sm md:text-base font-medium text-white btnBlue capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from "../components/organism/Cart/CartCard.vue";
// import Button from "../components/molecule/Button/Button.vue";
import { usersStore } from "../store/users.store";
import { computed } from "@vue/runtime-core";
import firebase from "firebase/app";
import "firebase/auth";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  components: { CartCard },
  methods: {
    checkOut() {
      Swal.fire({
        title: "Are you sure you want to check out?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes, please",
        denyButtonText: `No, continue shopping`,
      }).then(async (result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          await this.store.checkOutItems();
          // Swal.fire(
          //   "Thank you for purchasing in Exchange Platform!",
          //   "",
          //   "success"
          // );
          // this.$router.push("/user/my-purchase");
        } else if (result.isDenied) {
          Swal.fire("Continue Shopping", "", "info");
        }
      });
    },
  },
  setup() {
    const store = usersStore();
    firebase.auth().onAuthStateChanged((user) => {
      const uid = user.uid;
      store.showItemsInCart(uid);
    });

    const cartItems = computed(() => {
      return store.getItemsInCart;
    });
    const total = computed(() => {
      return store.getCurrentTotal;
    });
    return { cartItems, total, store };
  },
};
</script>

<style lang="scss">
.text-color {
  color: $secondary;
}
</style>
