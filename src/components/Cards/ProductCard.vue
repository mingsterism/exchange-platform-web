<template>
  <div>
    <div
      class="
        w-full
        xl:w-auto xl:min-w-xs
        max-w-xs
        mx-auto
        justify-between
        bg-white
        rounded-lg
        shadow-lg
        dark:bg-gray-800
        relative
      "
    >
      <img
        class="object-cover w-full h-28 md:h-48 rounded-t-lg"
        :src="item.photos[0]"
        alt="product image"
      />

      <div class="px-2 md:px-4 py-2 text-left w-44 md:w-auto">
        <div>
          <h1
            class="
              md:text-xl
              font-semibold
              truncate
              text-gray-800
              capitalize
              dark:text-white
            "
          >
            {{ item.name }}
          </h1>
          <p
            class="text-xs md:text-base truncate text-black dark:text-gray-400"
          >
            {{ item.description }}
          </p>
        </div>
        <div class="mt-2">
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Available Quantity: {{ item.quantity }}
          </p>
          <p class="text-xs md:text-sm text-gray-500 dark:text-gray-400">
            Conditions: {{ item.conditions }}
          </p>
        </div>
      </div>

      <div
        class="
          flex
          items-center
          justify-between
          px-2
          md:px-4
          py-1
          md:py-2
          bg-gray-500
          rounded-b-lg
        "
      >
        <h1 class="text-xs md:text-lg font-bold text-white">
          {{ item.points }} points
        </h1>
        <button @click="!show ? (show = true) : (show = false)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-three-dots-vertical h-3 md:h-6 text-white"
            viewBox="0 0 16 16"
          >
            <path
              d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"
            />
          </svg>
        </button>
      </div>
      <div
        v-if="show"
        class="
          absolute
          right-5
          btmPosition
          rounded-md
          overflow-hidden
          z-20
          text-gray-500
          shadow-md
        "
      >
        <p
          @click="goToEditor()"
          class="
            py-1
            px-4
            flex
            items-center
            bg-white
            hover:shadow-lg hover:bg-blue-400
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-pencil-fill h-3 md:h-4"
            viewBox="0 0 16 16"
          >
            <path
              d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"
            />
          </svg>
          <span class="ml-2">Edit</span>
        </p>
        <p
          @click="removeProduct()"
          class="
            py-1
            px-4
            flex
            items-center
            bg-white
            hover:shadow-lg hover:bg-red-500
            cursor-pointer
          "
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            class="bi bi-trash-fill h-3 md:h-4"
            viewBox="0 0 16 16"
          >
            <path
              d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
            />
          </svg>
          <span class="ml-2">Delete</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { userProduct } from "/@/store/user.product.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "Card",
  props: ["item"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    removeProduct() {
      Swal.fire({
        title: "Do you want to delete this product?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Yes, please",
        denyButtonText: `No, Don't delete`,
      }).then((result) => {
        if (result.isConfirmed) {
          const prodInfo = this.item;
          console.log("Prodinfo: ", prodInfo);
          this.store.deleteProductDoc(prodInfo);
          Swal.fire("Deleted!", "", "success");
        } else if (result.isDenied) {
          Swal.fire("You did not delete the product.", "", "info");
          this.show = false;
        }
      });
    },
    goToEditor() {
      const productDetail = this.item;
      this.store.goToEditorPage(productDetail);
    },
  },

  setup() {
    const store = userProduct();

    return { store };
  },
};
</script>

<style scoped>
.btmPosition {
  bottom: -55px;
}
</style>
