<template>
  <div className="shadow-md w-80 rounded-lg">
    <img
      class="rounded-t-md"
      src="https://i.imgur.com/hghfnW9.jpg"
      className="p-0"
    />
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
        </div>
      </div>
      <div className="pb-4">
        <Button
          @click="showProduct(post.uploadedBy, post.id)"
          label="View"
          :primary="true"
          size="medium"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue";
import { userProduct } from "/@/store/user.product.js";

export default {
  name: "Card",
  components: {
    Button,
  },
  props: ["post"],
  setup() {
    const store = userProduct();
    function showProduct(userId, prodId) {
      const storeId = store.goToProductPage(userId, prodId);
      if (storeId !== null) {
        // router.push({path: "/playground"})
        console.log("Getting product Id...");
      } else {
        alert("This product has been sold out!");
      }
    }

    return { store, showProduct };
  },
};
</script>

<style scoped></style>
