<template>
  <div className="shadow-md w-80">
    <div class="relative">
      <a href="#" @click="deleteProd" class="absolute -right-2 -top-3 border-2 rounded-lg p-1 bg-white hover:shadow-lg hover:bg-red-500">
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
      </a>
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
import Button from "../../molecule/Button/Button.vue";
import { currentUser, deleteProduct } from '/@/utils/firebase';
export default {
  name: "Card",
  components: {
    Button,
  },
  props: ["post"],
  props: {
    name: {
      type: String,
      required: false
    },
    product: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    shipping: {
      type: String,
      required: true,
      validator: function (value) {
        return ["Shipping", "Shipped", "Paid"].indexOf(value) !== -1;
      },
    },
    itemid: {
      type: Number
    }
  },
  methods: {
    deleteProd() {
      deleteProduct(String(this.post.id))
    }
  }
};
</script>

<style scoped></style>
