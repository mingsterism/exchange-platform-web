<template>
  <div className="shadow-md w-80 rounded-lg">
    <div class="rounded-t-md min-h-30 max-h-48 overflow-hidden">
      <img class="rounded-t-md" :src="post.photos[0]" className="p-0" />
    </div>
    <div>
      <div className="py-4 p-3 text-left">
        <div className="pb-2">
          <p className="text-2xl font-semibold">{{ post.name }}</p>
          <!-- <p className="mr-2 text-lg font-semibold self-center bg-red-100">
            {{ post.shipping }}
          </p> -->
        </div>
        <div class="min-h-36">
          <p className="break-words">{{ post.description }}</p>
          <p>Price: {{ post.points }} points</p>
          <p>Current Quantity: {{ post.quantity }}</p>
        </div>
      </div>
      <div className="pb-4">
        <Button
          class="hover:scale-110 transform transition ease-linear duration-300"
          type="button"
          @click="showProduct(post.id)"
          label="View Product"
          :primary="true"
          size="medium"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue";
import { usersStore } from "/@/store/users.store";
// import { userProduct } from "/@/store/user.product.js";

export default {
  name: "Card",
  components: {
    Button,
  },
  props: ["post"],
  // emits: ["view-product"],
  methods: {
    showProduct(prodId) {
      console.log("fire an event");
      this.store.displayProductView(prodId);
      this.$router.push('/view-product')
    },
  },
  setup() {
    const store = usersStore();
    // function showProduct(userId, prodId) {
    //   const storeId = store.goToProductPage(userId, prodId);
    //   if (storeId !== null) {
    //     // router.push({path: "/playground"})
    //     console.log("Getting product Id...");
    //   } else {
    //     alert("This product has been sold out!");
    //   }
    // }

    return { store };
  },
};
</script>

<style scoped></style>
