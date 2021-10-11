<template>
  <div
    class="w-full md:w-auto md:min-w-xs max-w-xs mx-auto overflow-hidden justify-between bg-white rounded-lg shadow-lg dark:bg-gray-800"
  >
    <div class="px-2 md:px-4 py-2 text-left">
      <h1
        class="md:text-2xl font-semibold truncate text-gray-800 capitalize dark:text-white"
      >
        {{ post.name }}
      </h1>
      <p class="text-xs md:text-base mt-1 truncate text-black dark:text-gray-400">
        {{ post.description }}
      </p>
      <p class="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
        Available Quantity: {{ post.quantity }}
      </p>
      <p class="mt-1 text-xs md:text-sm text-gray-500 dark:text-gray-400">
        Conditions: {{ post.conditions }}
      </p>
    </div>

    <img
      class="object-cover w-full h-28 md:h-48 mt-2"
      :src="post.photos[0]"
      alt="product image"
    />

    <div class="flex items-center justify-between px-2 md:px-4 py-1 md:py-2 bg-gray-900">
      <h1 class="text-xs md:text-lg font-medium md:font-bold text-white">{{ post.points }} points</h1>
      <button
        type="button"
        @click="showProduct(post.photos)"
        class="px-1 md:px-2 py-0.5 md:py-1 btnText font-semibold text-gray-900 uppercase transition-colors duration-200 transform bg-white rounded hover:bg-gray-200 focus:bg-gray-400 focus:outline-none"
      >
        View Product
      </button>
    </div>

    <div
      v-if="visible"
      class="flex justify-center items-center fixed h-screen z-30 inset-0 bg-black bg-opacity-60"
    >
      <div class="w-10/12 md:w-auto border rounded-lg py-2 md:py-7 px-4 md:px-10 border-gray-200 bg-white relative shadow-lg">
        <div class="absolute right-2 top-2">
          <button @click="visible = false">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-x-square h-6"
              viewBox="0 0 16 16"
            >
              <path
                d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div class="mb-3">
          <p class="text-xl text-left font-semibold text-gray-800 capitalize">
            {{ post.name }}
          </p>
          <div class="h-px bg-black"></div>
        </div>
        <div class="flex justify-center mb-3">
          <button
            type="button"
            class="hover:scale-125 transform transition ease-in-out duration-200"
            @click="clickLeft"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
              />
            </svg>
          </button>

          <img
            class="object-cover w-full md:w-auto h-48 mt-2 mx-2"
            :src="post.photos[photoIndex]"
            alt="product image"
          />

          <button
            type="button"
            class="hover:scale-125 transform transition ease-in-out duration-200"
            @click="clickRight"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-chevron-right"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </button>
        </div>
        <div class="text-left mb-4 w-80">
          <p class="text-black text-sm md:text-base">{{ post.description }}</p>
          <p class="text-gray-700 text-sm">Condition: {{ post.conditions }}</p>
          <p class="text-gray-700 text-sm">Quantity: {{ post.quantity }}</p>
        </div>
        <div class="flex justify-between text-sm md:text-base">
          <div>
            <label for="qty">Quantity:</label>
            <input
              class="border-2 border-gray-400 rounded-lg p-1 ml-2"
              type="number"
              name="productPoints"
              v-model="userQty"
              required
              :max="post.quantity"
              min="1"
            />
          </div>
          <button
            @click="addItemToCart(post)"
            type="button"
            class="px-4 py-2 font-medium text-white btnBlue capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Button from "../../molecule/Button/Button.vue";
import { usersStore } from "/@/store/users.store";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { addToCart } from "/@/utils/cart";

export default {
  name: "Card",
  // components: {
  //   Button,
  // },
  props: ["post"],
  data() {
    return {
      visible: false,
      userQty: 1,
      photoIndex: 0,
      photoQty: null,
    };
  },
  methods: {
    showProduct(prodPhotos) {
      // console.log("fire an event");
      // this.store.displayProductView(prodId);
      // this.$router.push("/view-product");

      this.photoQty = prodPhotos.length;
      // console.log("Photo qty for this product is ", this.photoQty);
      this.visible = true;

      // console.log("fire an event");
      // this.$emit("view-product")
      // console.log("emit a function to parent");
    },
    clickLeft() {
      if (this.photoIndex === 0) {
        return;
      } else {
        this.photoIndex -= 1;
      }
    },
    clickRight() {
      if (this.photoIndex === this.photoQty - 1) {
        return;
      } else {
        this.photoIndex += 1;
      }
    },
    async addItemToCart(post) {
      const productDetail = post;
      // console.log("Product Detail: ", productDetail);
      const addItem = {
        productId: productDetail.id,
        id: String(Date.now()),
        name: productDetail.name,
        photos: productDetail.photos,
        points: productDetail.points,
        desireQuantity: Number(this.userQty),
        totalPoints: Number(this.userQty * productDetail.points),
        checkOut: false,
        soldBy: productDetail.uploadedBy,
      };
      // console.log("Added item: ", addItem);
      await addToCart(addItem);
      this.visible = false;
      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  setup() {
    const store = usersStore();
  
    return { store };
  },
};
</script>

<style lang="scss">
.popOutColor {
  background-color: $pop-out;
}
.btnText {
  font-size: 10px;
}
</style>