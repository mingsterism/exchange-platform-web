<template>
  <div class="p-10 md:px-20">
    <div class="flex justify-center">
      <div>
        <div class="mb-2 lg:max-w-md">
          <h1 class="text-xl text-left">Edit Product</h1>
          <div class="h-px bg-black"></div>
        </div>
        <div class="lg:max-w-md">
          <div
            class="flex flex-wrap items-start gap-3 border border-gray-400 rounded-md p-2 h-40 overflow-y-auto"
            id="productImgCont"
          >
            <!-- index to point at the items -->
            <Image
              v-for="(image, index) in productPhotos"
              :key="index"
              :src="image"
            />
            <!-- <div class="flex flex-col justify-around h-40 text-sm">
              <input
                class="hidden"
                type="file"
                accept="image/*"
                name="image"
                id="uploadProductImg"
                @change="uploadProductImage($event)"
              />
              <label
                class="px-3 py-2 text-white rounded-md btnBlue hover:opacity-70 transition ease-linear duration-300"
                for="uploadProductImg"
                style="cursor: pointer"
                >Upload</label
              >
              <input
                class="hidden"
                type="button"
                name="popImage"
                id="popProductImage"
                @click="popProductImage()"
              />
              <label
                class="px-3 py-2 text-white rounded-md btnBlue hover:opacity-70 transition ease-linear duration-300"
                for="popProductImage"
                style="cursor: pointer"
                >Delete</label
              >
            </div> -->
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
          <div class="flex justify-end w-full mt-5">
            <Button
              class="mb-10 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
              type="button"
              label="Update"
              :primary="true"
              @click="updateDetails"
            />
            <Button
              class="mb-10 ml-3 transform hover:scale-125 hover:opacity-75 transition ease-out duration-300"
              type="submit"
              label="Cancel"
              :primary="true"
              @click="returnToProfile"
            />
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
