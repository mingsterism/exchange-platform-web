<template>
  <div class="flex items-center ml-52 mt-12">
    <div>
      <Image :src="profilePicture" class="rounded-full" />
      <div class="relative left-10 bottom-5">
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
            class="opacity-0 border-2 border-gray-500 rounded-md p-1 bg-gray-200 text-xs font-semibold hover:opacity-100"
            for="file"
            style="cursor: pointer"
            >Upload Image</label
          >
        </p>
      </div>
    </div>
    <p className="pl-10 pb-0 text-left font-semibold text-5xl">User Profile</p>
  </div>
  <div className="flex flex-col items-start pb-12 pl-52">
    <div className="flex">
      <div className="flex flex-col items-start pb-8 pr-16">
        <label
          for="firstName"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >First Name</label
        >
        <input
          class="border-4 border-gray-400 rounded-lg p-1.5"
          type="text"
          name="firstName"
          v-model="firstName"
        />
      </div>
      <div className="flex flex-col items-start pb-8">
        <label
          for="lastName"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Last Name</label
        >
        <input
          class="border-4 border-gray-400 rounded-lg p-1.5"
          type="text"
          name="lastName"
          v-model="lastName"
        />
      </div>
    </div>

    <div className="flex flex-col items-start pb-8">
      <!-- <Textbox nametag="aboutUser" text="About Me" /> -->
      <label for="aboutMe" class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
        >About Me</label
      >
      <textarea
        name="aboutMe"
        class="border-4 border-gray-400 rounded-lg p-1.5"
        id="aboutMe"
        cols="60"
        rows="5"
        v-model="aboutMe"
      ></textarea>
    </div>
    <div className="flex items-end">
      <div className="flex flex-col items-start">
        <!-- <Textbox nametag="shipAdd" text="Shipping Address" /> -->
        <label
          for="shippingAddress"
          class="text-gray-600 mt-3 h-auto w-52 text-left p-2"
          >Shipping Address</label
        >
        <textarea
          name="shippingAddress"
          class="border-4 border-gray-400 rounded-lg p-1.5"
          id="shippingAddress"
          cols="60"
          rows="5"
          v-model="shippingAddress"
        ></textarea>
      </div>
      <div>
        <!-- <button @click="updateProfileDetail">Update Profile</button> -->
        <Button
          class="ml-5 transform hover:scale-110 hover:opacity-75 transition ease-out duration-300"
          type="submit"
          @click="updateProfileDetail"
          label="Update Profile"
          :primary="true"
        />
      </div>
    </div>
  </div>
  <div>
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
  </div>
</template>

<script>
import Image from "/@/components/molecule/Image/Image.vue";
import Button from '/@/components/molecule/Button/Button.vue';
import { userProfile } from "../store/user.profile.js";

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
    loadProfileImg: function (event) {
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
    },
  },
  components: {
    Image, Button
  },
  setup() {
    const store = userProfile();

    store.getProfile();
    store.getProfileImg();
  },
};
</script>

<style scoped>
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
</style>
