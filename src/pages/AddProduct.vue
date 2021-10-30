<template>
  <div class="md:px-5">
    <div class="mb-5">
      <h1 class="text-3xl text-left font-semibold">Add Product</h1>
    </div>
    <div
      v-if="uploading"
      class="
        flex
        items-center
        justify-center
        z-40
        inset-0
        w-screen
        h-screen
        bg-gray-500 bg-opacity-50
        absolute
      "
    >
      <svg viewBox="0 0 50 50" class="spinning">
        <circle class="ring" cx="25" cy="25" r="20"></circle>
        <circle class="ball" cx="25" cy="5" r="3.5"></circle>
      </svg>
    </div>
    <div>
      <div>
        <div
          class="flex flex-wrap items-start gap-3 rounded-md p-2"
          id="productImgCont"
        >
          <Image
            v-for="(image, index) in productPhotos"
            :key="index"
            :srcImg="image"
            @pop-product-img="popProductImage()"
          />
          <div
            class="
              flex
              items-center
              justify-center
              h-36
              w-36
              border
              rounded-md
              text-sm
              bg-white
            "
          >
            <input
              class="hidden"
              type="file"
              accept="image/*"
              name="image"
              id="uploadProductImg"
              @change="uploadProductImage($event)"
            />
            <label
              class="hover:opacity-50 transition ease-out duration-300"
              for="uploadProductImg"
              style="cursor: pointer"
              ><svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                class="bi bi-plus h-10"
                viewBox="0 0 16 16"
              >
                <path
                  d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                /></svg
            ></label>
          </div>
        </div>
        <div class="mt-2">
          <p class="text-left text-xs text-gray-400">
            *Please note that the first photo will be the primary.
          </p>
        </div>
      </div>
      <div class="flex flex-col text-sm w-full xl:max-w-md pt-3">
        <div class="flex flex-col md:flex-row justify-between md:items-end">
          <div class="flex flex-col flex-1 md:pr-2">
            <label for="productName" class="addProdLabel">Product Name</label>
            <input
              class="addProdInput"
              type="text"
              name="productName"
              placeholder="Enter product name"
              v-model="productName"
              required
            />
          </div>
          <div class="flex flex-col flex-1 md:pl-2">
            <label for="productPoints" class="addProdLabel"
              >Product Points</label
            >
            <input
              class="addProdInput"
              type="number"
              name="productPoints"
              placeholder="Enter product value"
              v-model="productPoints"
              required
            />
          </div>
        </div>
        <div class="flex flex-col md:flex-row md:items-end">
          <div class="flex flex-col flex-1 md:pr-2">
            <label for="productQty" class="addProdLabel"
              >Product Quantity</label
            >
            <input
              class="addProdInput"
              type="number"
              name="productQty"
              placeholder="Enter product quantity"
              v-model="productQty"
              required
            />
          </div>

          <div class="flex flex-col flex-1 md:pl-2">
            <label class="addProdLabel" for="condition">Condition</label>
            <select
              class="border border-gray-400 rounded-md py-1.5 px-1"
              name="condition"
              v-model="productCondition"
            >
              <option value="Almost new">ALMOST NEW</option>
              <option value="Slightly used">SLIGHTLY USED</option>
              <option value="Frequently used">FREQUENTLY USED</option>
            </select>
          </div>
        </div>
      </div>
      <div class="flex flex-col items-start">
        <label for="productDescription" class="addProdLabel">Description</label>
        <textarea
          name="productDescription"
          class="
            border border-gray-400
            text-sm
            rounded-lg
            p-1.5
            w-full
            xl:w-9/12
            resize-none
          "
          id="productDescription"
          rows="6"
          placeholder="Enter product description here."
          v-model="productDescription"
        ></textarea>
        <div class="flex justify-end w-full xl:w-9/12 mt-5">
          <button
            @click="createProduct"
            type="button"
            class="
              px-4
              py-2
              font-medium
              text-white
              btnDark
              capitalize
              transition-colors
              duration-300
              transform
              rounded-md
              hover:opacity-75
              focus:outline-none
              focus:ring
              focus:ring-indigo-300
              focus:ring-opacity-80
            "
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/Image/Image.vue";
import { userProduct } from "../store/user.product.js";
import "firebase/auth";
import firebase from "firebase/app";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "AddProduct",
  data() {
    return {
      productPhotos: [],
      productName: "",
      productPoints: null,
      productQty: null,
      productCondition: "",
      productDescription: "",
      imgFiles: [],
      uploading: false,
    };
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    async createProduct() {
      if (this.productName === null || this.productName === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product name.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productPoints === null || this.productPoints === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product points.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productQty === null || this.productQty === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product quantity.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productCondition === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product conditions.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      if (this.productDescription === "") {
        Swal.fire({
          title: "Uh Oh!",
          text: "Please key in the product descriptions.",
          icon: "error",
          confirmButtonColor: "#1ea7fd",
        });
        return;
      }
      this.uploading = true;
      Swal.fire({
        icon: "info",
        title: "Uploading in progress...",
        showConfirmButton: false,
        timer: 2000,
      });
      const user = firebase.auth().currentUser;
      const productDetails = {
        id: String(Date.now()),
        uploadedBy: user.uid,
        name: this.productName,
        points: parseInt(this.productPoints),
        quantity: parseInt(this.productQty),
        conditions: this.productCondition,
        description: this.productDescription,
        status: "true",
        photos: [],
      };
      await userProduct().createUserProduct(productDetails, this.imgFiles);
      this.productName = "";
      this.productPoints = "";
      this.productQty = "";
      this.imgFiles = [];
      this.productPhotos = [];
      this.productCondition = "";
      this.productDescription = "";
      this.uploading = false;
    },
    uploadProductImage(event) {
      if (this.productPhotos.length <= 2) {
        console.log(event.target.files);
        this.productPhotos.push(URL.createObjectURL(event.target.files[0]));
        this.imgFiles.push(event.target.files[0]);
        console.log("Current images: ", this.productPhotos);
        console.log("Current files: ", this.imgFiles);
      } else {
        console.log("Cannot upload more than 3 images...");
      }
    },
    popProductImage() {
      this.productPhotos.pop();
      this.imgFiles.pop();
    },
  },
  components: {
    Image,
  },
  setup() {
    const store = userProduct();

    return { store };
  },
};
</script>

<style lang="scss">
.btnDark {
  background-color: $dark;
}

.spinning {
  width: 3.75em;
  animation: 1.5s spin ease infinite;
}

.ring {
  fill: none;
  stroke: #000000;
  stroke-width: 2;
}

.ball {
  fill: #000000;
  stroke: none;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>
