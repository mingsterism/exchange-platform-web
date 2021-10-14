<template>
  <div class="py-10">
    <div class="flex justify-center w-screen">
      <div>
        <div class="mb-2 lg:min-w-md">
          <h1 class="text-xl text-left">Edit Product</h1>
          <div class="h-px bg-black"></div>
        </div>
        <div class="lg:min-w-md">
          <div
            class="flex flex-wrap items-start gap-3 rounded-md p-2"
            id="productImgCont"
          >
            <!-- index to point at the items -->
            <Image
              v-for="(image, index) in productPhotos"
              :key="index"
              :srcImg="image"
            />
            <div
              class="flex items-center justify-center h-36 w-36 border rounded-md text-sm bg-white cursor-not-allowed"
            >
              <input
                class="hidden cursor-not-allowed"
                type="file"
                accept="image/*"
                name="image"
                id="uploadProductImg"
                @change="uploadProductImage($event)"
                disabled
              />
              <label
                class="hover:opacity-50 transition ease-out duration-300"
                for="uploadProductImg"
                style="cursor: pointer"
                ><svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="bi bi-plus h-10 cursor-not-allowed"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
                  /></svg
              ></label>
            </div>
          </div>
          <div class="mt-2">
            <p class="text-left text-xs">
              *Please note that the first photo will be the primary.
            </p>
          </div>
        </div>
        <div class="flex flex-col text-sm pt-3 max-w-md">
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
                disabled
                class="addProdInput cursor-not-allowed"
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
                v-model="condition"
              >
                <option value="Almost new">ALMOST NEW</option>
                <option value="Slightly used">SLIGHTLY USED</option>
                <option value="Frequently used">FREQUENTLY USED</option>
              </select>
            </div>
          </div>
        </div>
        <div class="flex flex-col lg:max-w-md">
          <label for="productDescription" class="addProdLabel"
            >Description</label
          >
          <textarea
            name="productDescription"
            class="border border-gray-400 text-sm rounded-lg p-1.5 w-full resize-none"
            id="productDescription"
            rows="6"
            placeholder="Enter product description here."
            v-model="productDescription"
          ></textarea>
          <div class="flex items-center justify-end w-full mt-5">
            <!-- <Button
              class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
              type="button"
              label="Update"
              :primary="true"
              @click="updateDetails"
            /> -->
            <!-- <Button
              class="mb-10 ml-3 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
              type="submit"
              label="Cancel"
              :primary="true"
              @click="returnToProfile"
            /> -->
            <button
              @click="returnToProfile"
              type="button"
              class="px-4 py-2 mr-2 font-medium capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
            >
              Cancel
            </button>
            <button
              @click="updateDetails"
              type="button"
              class="px-4 py-2 font-medium text-white btnDark capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { userProduct } from "../store/user.product";
export default {
  components: {
    Image,
    Button,
  },
  // data() {
  //   return {
  //     imgFiles: [],
  //     removedImg: [],
  //   };
  // },
  methods: {
    returnToProfile() {
      this.$router.push("/user/my-product");
    },
    updateDetails() {
      const newDetails = {
        name: this.productName,
        quantity: this.productQty,
        conditions: this.condition,
        description: this.productDescription,
      };
      this.store.editProductDetail(newDetails);
    },
    // uploadProductImage(event) {
    //   if (this.productPhotos.length <= 2) {
    //     console.log(event.target.files);
    //     this.productPhotos.push(URL.createObjectURL(event.target.files[0]));
    //     this.imgFiles.push(event.target.files[0]);
    //     console.log("Current images: ", this.productPhotos);
    //     console.log("Current files: ", this.imgFiles);
    //   } else {
    //     console.log("Cannot upload more than 3 images...");
    //   }
    // },
    // popProductImage() {
    //   this.removedImg.push(this.productPhotos.pop());
    //   this.imgFiles.pop();
    // },
  },
  computed: {
    productName: {
      get() {
        return userProduct().getEditProductName;
      },
      set(payload) {
        return userProduct().changeProductName(payload);
      },
    },
    productPoints: {
      get() {
        return userProduct().getEditProductPoints;
      },
      set(payload) {
        return userProduct().changeProductPoints(payload);
      },
    },
    productQty: {
      get() {
        return userProduct().getEditProductQty;
      },
      set(payload) {
        return userProduct().changeProductQty(payload);
      },
    },
    condition: {
      get() {
        return userProduct().editProductCondition;
      },
      set(payload) {
        return userProduct().changeProductCondition(payload);
      },
    },
    productDescription: {
      get() {
        return userProduct().getEditProductDescription;
      },
      set(payload) {
        return userProduct().changeProductDescription(payload);
      },
    },
    productPhotos() {
      return userProduct().getEditProductPhotos;
    },
    currentDetails() {
      return this.store.getProductToEdit;
    },
  },
  setup() {
    const store = userProduct();

    return { store };
  },
};
</script>

<style></style>
