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
    <p className="px-20 pb-0 text-left font-semibold text-5xl">User Profile</p>
  </div>
  <div className="flex flex-col items-start p-12 px-52">
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
      <div
        class="p-2 border-2 border-black bg-blue-600 text-white rounded-lg ml-20 hover:bg-white hover:text-black transition ease-out duration-300"
      >
        <button @click="updateProfileDetail">Update Profile</button>
      </div>
    </div>
  </div>
  <div>
    <div class="flex p-12 justify-around">
      <!-- <a className="pl-40 text-left font-semibold text-4xl">My Products</a>
      <a className="px-40 text-left text-4xl">My Purchase</a>
      <a className="pr-40 text-left text-4xl">Add Product</a> -->
      <router-link to="/profile" class="pl-40 text-left text-4xl"
        >My Products</router-link
      >
      <router-link to="/profile/my-purchase" class="px-40 text-left text-4xl"
        >My Purchase</router-link
      >
      <router-link to="/profile/add-product" class="px-40 text-left text-4xl"
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
import { userProfile } from "../store/user.profile.js";
import { onMounted } from "@vue/runtime-core";

export default {
  name: "ProfileMod",
  data() {
    return {
      profilePicture:
        "https://images.csmonitor.com/csm/2020/10/1109550_1_1005-seal-maine_standard.jpg?alias=standard_900x600",
    };
  },
  computed: {
    firstName: {
      get() {
        return userProfile().setFirstName;
      },
      set(payload) {
        return userProfile().changedFirstName(payload);
      },
    },
    lastName: {
      get() {
        return userProfile().setLastName;
      },
      set(payload) {
        return userProfile().changedLastName(payload);
      },
    },
    aboutMe: {
      get() {
        return userProfile().setAboutMe;
      },
      set(payload) {
        return userProfile().changedAboutMe(payload);
      },
    },
    shippingAddress: {
      get() {
        return userProfile().setShippingAddress;
      },
      set(payload) {
        return userProfile().changedShippingAddress(payload);
      },
    },
  },
  methods: {
    loadProfileImg: function (event) {
      this.profilePicture = URL.createObjectURL(event.target.files[0]);
      console.log(this.profilePicture);

      // need to store the image and load it when user logins
    },
    handleBack() {
      this.$router.go(-1);
    },
    async updateProfileDetail() {
      console.log(this.lastName);
      await userProfile().updateProfile(
        this.firstName,
        this.lastName,
        this.aboutMe,
        this.shippingAddress
      );
    },
  },
  components: {
    Image,
  },
  setup() {
    const store = userProfile();
    // const firstName = ref(store.setFirstName)
    // const lastName = ref(store.setLastName)
    // const aboutMe = ref(store.setAboutMe)
    // const shippingAddress = ref(store.setShippingAddress)
    // const displayInfo = store.getProfile();
    const displayInfo = onMounted(() => {
      store.getProfile();
    });

    return { displayInfo };
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
</style>
