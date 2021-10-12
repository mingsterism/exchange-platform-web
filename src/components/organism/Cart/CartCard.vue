<template>
  <div
    class="flex justify-between items-center p-2 border mb-2 rounded-md bg-white shadow-md max-w-xl xl:max-w-lg"
  >
    <!-- rectangular card -->
    <div class="flex items-center">
      <div class="w-32 max-h-24 md:max-h-20 overflow-hidden">
        <!-- <Images :src="productPhotos" /> -->
        <img :src="post.photos[0]" />
      </div>
      <div class="ml-2 text-left">
        <p class="md:text-lg font-semibold">{{ post.name }}</p>
        <!-- <div>
      Product Description
      </div> -->
        <p class="text-xs md:text-sm">{{ post.points }} points</p>
        <p class="text-xs md:text-sm mt-2">
          Quantity:
          <input
            class="border border-gray-400 px-1 py-0.5 w-9 md:w-10"
            @keydown.enter="updateTotal"
            @mouseleave="updateTotal"
            type="number"
            :min="post.desireQuantity"
            v-model="quantity"
          />
        </p>
        <p class="md:hidden text-xs md:text-sm mt-1">
          Total cost: {{ post.totalPoints }} points
        </p>
      </div>
    </div>
    <!-- <div class="text-left text-sm">
      <p>Price:</p>
      <p>{{ post.points }} points</p>
    </div> -->
    <!-- <div>
      <p class="text-sm">
        Quantity:
        <input
          class="border border-gray-400 rounded-lg p-1 w-10"
          @keydown.enter="updateTotal"
          type="number"
          :min="post.desireQuantity"
          v-model="quantity"
        />
      </p>
    </div> -->

    <div class="flex justify-between items-center md:w-4/12">
      <div class="hidden md:inline text-left text-sm">
        <p>Total cost:</p>
        <p>{{ post.totalPoints }} points</p>
      </div>
      <div class="md:inline md:px-3">
        <button
          class="text-red-700 lg:text-black hover:text-red-700 transform transition ease-linear duration-200"
          @click="removeItem(post.id)"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-trash md:w-6 w-5"
            viewBox="0 0 16 16"
          >
            <path
              d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"
            />
            <path
              fill-rule="evenodd"
              d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue";
import Images from "../../molecule/Image/Image.vue";
import { usersStore } from "/@/store/users.store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { updateTotalPrice } from "/@/utils/cart";

export default {
  components: { Images, Button },
  props: ["post"],
  data() {
    return {
      quantity: this.post.desireQuantity,
    };
  },
  methods: {
    removeItem(prodId) {
      Swal.fire({
        title: "Do you want to remove this item from cart?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes, please",
        denyButtonText: `No, Don't remove`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          console.log("Removing item from cart...", prodId);
          this.store.removeItemFromCart(prodId);
          Swal.fire("Removed!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("You did not delete the product.", "", "info");
        }
      });
      // const productId = prodId;
      // console.log("Removing item from cart...", productId);
      // usersStore().removeItemFromCart(String(productId));
    },
    async updateTotal() {
      if (this.quantity === 0) {
        return;
      }
      const newTotal = this.quantity * this.post.points;
      await updateTotalPrice(this.quantity, newTotal, this.post.id);
      // await this.store.showItemsInCart();
      this.post.desireQuantity = this.quantity;
      this.post.totalPoints = newTotal;
      await this.store.updateTotalCost();
      console.log("update complete");
    },
  },
  setup() {
    const store = usersStore();

    return { store };
  },
};
</script>

<style></style>
