<template>
  <div className="shadow-md w-80">
    <div class="relative">
      <p
      @click="goToEditor(post.id)"
        class="absolute right-9 -top-3 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-blue-400 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-pencil-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
          />
        </svg>
      </p>
      <p
        @click="store.deleteProductDoc(post.id)"
        class="absolute -right-2 -top-3 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-red-500 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          class="bi bi-trash-fill h-6"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
          />
        </svg>
      </p>
    </div>
    <img src="https://i.imgur.com/hghfnW9.jpg" className="p-0" />
    <div>
      <div className="py-4 p-3 text-left">
        <div className="flex flex-row justify-between pb-2">
          <p className="text-2xl font-semibold">{{ post.name }}</p>
          <p className="mr-2 text-lg font-semibold self-center bg-red-100">
            {{ post.shipping }}
          </p>
        </div>
        <p className="min-h-36 break-words">{{ post.description }}</p>
      </div>
      <div className="pb-4">
        <Button label="Button" :primary="true" size="medium" />
      </div>
    </div>
  </div>
</template>

<script>
// import { mapState } from 'pinia';
import Button from "../../molecule/Button/Button.vue";
import router from '/@/router/router.js';
import { userProduct } from "/@/store/user.product.js";
// import { deleteProduct } from '/@/utils/firebase';
export default {
  name: "Card",
  components: {
    Button,
  },
  props: ["post"],

  methods: {
  //   ...mapState(userProduct, ['storeProdId ']),
  //   async goToEditor(prodId) {
  //     await storeProdId(prodId)
  //     this.$router.push('/playground')
  //   }
   },

  setup() {
    const store = userProduct();
    function goToEditor(prodId) {
      const storeId = store.storeProdId(prodId)
      if (storeId !== null) {
        // router.push({path: "/playground"})
        console.log("Getting product Id...");
      } else {
        alert("This product does not exist!")
      }
    }

    return { store, goToEditor };
  },
};
</script>

<style scoped></style>
