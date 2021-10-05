<template>
  <div class="flex justify-center">
    <div class="py-10 px-5 w-8/12">
      <div class="mb-3">
        <h1 class="text-3xl text-left">Shopping Cart</h1>
        <hr />
      </div>
      <div class="">
        <!-- Cart cards -->
        <CartCard
          :post="item"
          v-for="(item, index) in cartItems"
          :key="index"
        />
      </div>
      <div class="flex flex-col items-end mt-8">
        <!-- checkout footer -->
        <div class="mb-2">
          <p class="text-xl font-semibold">Total Price: {{ total }} points</p>
        </div>
        <div>
          <Button
            class="ml-5 transform hover:scale-110 hover:opacity-75 transition ease-out duration-300"
            type="button"
            @click="checkOut"
            label="Check Out"
            :primary="true"
          />
        </div>
        <div>
          <p class="text-color">testing the css text</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartCard from "../components/organism/Cart/CartCard.vue";
import Button from "../components/molecule/Button/Button.vue";
import { usersStore } from "../store/users.store";
import { computed } from "@vue/runtime-core";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  components: { CartCard, Button },
  methods: {
    checkOut() {
      Swal.fire({
        title: "Are you sure you want to check out?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes, please",
        denyButtonText: `No, continue shopping`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          this.store.checkOutItems();
          Swal.fire(
            "Thank you for purchasing in Exchange Platform!",
            "",
            "success"
          );
          this.$router.push("/profile/my-purchase");
        } else if (result.isDenied) {
          Swal.fire("Continue Shopping", "", "info");
        }
      });
    },
  },
  setup() {
    const store = usersStore();
    store.showItemsInCart();
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
  color: $secondary-color;
}
</style>
