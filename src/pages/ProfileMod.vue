<template>
  <div class="py-10">
    <div class="flex justify-center">
      <div class="min-w-md">
        <p className="text-4xl text-left font-semibold mb-2">My Profile</p>
        <div class="h-px bg-black"></div>
      </div>
    </div>
    <div className="flex flex-col items-center mt-10">
      <div class="flex items-center justify-center">
        <Image :src="profilePicture" class="rounded-full" />
        <div class="ml-5">
          <p>
            <input
              class="hidden"
              type="file"
              accept="image/*"
              name="image"
              id="file"
              @change="loadProfileImg($event)"
            />
          </p>
          <p>
            <label
              class="px-4 py-2 font-medium text-white btnBlue capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-80"
              for="file"
              >Upload Image</label
            >
          </p>
        </div>
      </div>
      <div class="flex min-w-md text-sm">
        <div className="flex flex-1 flex-col pr-2">
          <label
            for="firstName"
            class="text-gray-600 mt-3 h-auto w-52 text-left p-1"
            >First Name:</label
          >
          <input
            class="border-2 rounded-md p-1.5"
            type="text"
            name="firstName"
            v-model="firstName"
          />
        </div>
        <div className="flex flex-1 flex-col pl-2">
          <label
            for="lastName"
            class="text-gray-600 mt-3 h-auto w-52 text-left p-1"
            >Last Name:</label
          >
          <input
            class="border-2 rounded-lg p-1.5"
            type="text"
            name="lastName"
            v-model="lastName"
          />
        </div>
      </div>

      <div className="flex flex-col min-w-md text-sm">
        <label
          for="aboutMe"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-1"
          >About Me:</label
        >
        <textarea
          name="aboutMe"
          class="border-2 rounded-md p-1.5 resize-none"
          id="aboutMe"
          cols="60"
          rows="3"
          v-model="aboutMe"
        ></textarea>
      </div>
      <div className="flex flex-col pb-4 min-w-md text-sm">
        <div className="flex flex-col">
          <label
            for="shippingAddress"
            class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
            >Shipping Address</label
          >
          <textarea
            name="shippingAddress"
            class="border-2 rounded-md p-1.5 resize-none"
            id="shippingAddress"
            cols="60"
            rows="3"
            v-model="shippingAddress"
          ></textarea>
        </div>
        <div class="mt-4 flex justify-end">
          <Button
            class="transform hover:opacity-75 transition ease-out duration-300"
            type="submit"
            @click="updateProfileDetail"
            label="Update Profile"
            :primary="true"
          />
        </div>
      </div>
    </div>
    <!-- <div>
      <div class="flex px-24 py-10 justify-around">
        <router-link to="/profile" class="text-left text-3xl"
          >My Products</router-link
        >
        <router-link to="/profile/my-purchase" class="text-left text-3xl"
          >My Purchase</router-link
        >
        <router-link to="/profile/add-product" class="text-left text-3xl"
          >Add Product</router-link
        >
      </div>
      <router-view v-slot="{ Component }">
        <transition name="route" mode="out-in">
          <component :is="Component"></component>
        </transition>
      </router-view>
    </div> -->
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from "/@/components/molecule/Button/Button.vue";
import { userProfile } from "../store/user.profile.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  name: "ProfileMod",
  computed: {
    firstName: {
      get() {
        return userProfile().getFirstName;
      },
      set(payload) {
        return userProfile().changedFirstName(payload);
      },
    },
    lastName: {
      get() {
        return userProfile().getLastName;
      },
      set(payload) {
        return userProfile().changedLastName(payload);
      },
    },
    aboutMe: {
      get() {
        return userProfile().getAboutMe;
      },
      set(payload) {
        return userProfile().changedAboutMe(payload);
      },
    },
    shippingAddress: {
      get() {
        return userProfile().getShippingAddress;
      },
      set(payload) {
        return userProfile().changedShippingAddress(payload);
      },
    },
    profilePicture() {
      return userProfile().getProfilePic;
    },
  },
  methods: {
    loadProfileImg(event) {
      // this.profilePicture = URL.createObjectURL(event.target.files[0]);
      // console.log(this.profilePicture);
      userProfile().uploadProfileImg(event.target.files[0]);
      // need to store the image and load it when user logins
    },
    handleBack() {
      this.$router.go(-1);
    },
    async updateProfileDetail() {
      // console.log(this.lastName);
      const newDetails = {
        first_name: this.firstName,
        last_name: this.lastName,
        about: this.aboutMe,
        address: this.shippingAddress,
      };
      await userProfile().updateProfile(newDetails);
      Swal.fire({
        title: "Success!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
  },
  components: {
    Image,
    Button,
  },
  setup() {
    const store = userProfile();

    // store.getProfile();
    // store.getProfileImg();
  },
};
</script>

<style lang="scss">
.route-enter-from {
  opacity: 0;
  transform: translateX(100px);
}

.route-leave-to {
  opacity: 0;
  transform: translateX(-100px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.router-link-exact-active {
  border-bottom: 1px solid black;
}

.btnBlue {
  background-color: $blue;
}

</style>
