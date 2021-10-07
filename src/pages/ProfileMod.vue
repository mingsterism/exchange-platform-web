<template>
  <div class="py-10 px-10 md:px-0">
    <div class="md:flex justify-center">
      <div class="md:min-w-md">
        <p className="text-2xl md:text-3xl text-left font-semibold mb-1">My Profile</p>
        <div class="h-px bg-black"></div>
      </div>
    </div>
    <div className="flex flex-col items-center mt-10">
      <div class="flex flex-col md:flex-row items-center justify-center">
        <Image :src="profilePicture" class="rounded-full" />
        <div class="md:ml-5 mt-5 md:mt-0">
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
              class="px-4 py-2 font-medium text-white btnBlue capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
              for="file"
              >Upload Image</label
            >
          </p>
        </div>
      </div>
      <div class="flex flex-col md:flex-row md:min-w-md text-sm w-full md:w-auto">
        <div className="flex flex-1 flex-col md:pr-2">
          <label for="firstName" class="editProfileLabel">First Name:</label>
          <input
            class="editProfileInput"
            type="text"
            name="firstName"
            v-model="firstName"
          />
        </div>
        <div className="flex flex-1 flex-col md:pl-2">
          <label for="lastName" class="editProfileLabel">Last Name:</label>
          <input
            class="editProfileInput"
            type="text"
            name="lastName"
            v-model="lastName"
          />
        </div>
      </div>

      <div className="flex flex-col md:min-w-md text-sm w-full md:w-auto">
        <label for="aboutMe" class="editProfileLabel">About Me:</label>
        <textarea
          name="aboutMe"
          class="editProfileInput resize-none"
          id="aboutMe"
          rows="3"
          v-model="aboutMe"
        ></textarea>
      </div>
      <div className="flex flex-col pb-4 md:min-w-md text-sm w-full md:w-auto">
        <div className="flex flex-col">
          <label for="shippingAddress" class="editProfileLabel"
            >Shipping Address</label
          >
          <textarea
            name="shippingAddress"
            class="editProfileInput resize-none"
            id="shippingAddress"
            rows="3"
            v-model="shippingAddress"
          ></textarea>
        </div>
        <div class="mt-4 flex justify-end">
          <div>
            <!-- <Button
              class="transform hover:opacity-75 transition ease-out duration-300"
              type="submit"
              @click="updateProfileDetail"
              label="Update Profile"
              :primary="true"
            /> -->
            <button
              @click="updateProfileDetail"
              type="button"
              class="px-4 py-2 font-medium text-white btnBlue capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              Update Profile
            </button>
          </div>
          <div class="ml-2">
            <!-- <Button
              class="transform hover:opacity-75 transition ease-out duration-300"
              type="button"
              @click="deleteAccount"
              label="Delete Account"
              :primary="true"
            /> -->
            <button
              @click="deleteAccount"
              type="button"
              class="px-4 py-2 font-medium text-white btnRed capitalize transition-colors duration-300 transform rounded-md hover:opacity-75 focus:outline-none focus:ring focus:ring-red-300 focus:ring-opacity-80"
            >
              Delete Account
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
import { userProfile } from "../store/user.profile.js";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import { deleteAcc } from "../utils/firebase.js";

export default {
  name: "ProfileMod",
  computed: {
    firstName: {
      get() {
        return this.store.getFirstName;
      },
      set(payload) {
        return this.store.changedFirstName(payload);
      },
    },
    lastName: {
      get() {
        return this.store.getLastName;
      },
      set(payload) {
        return this.store.changedLastName(payload);
      },
    },
    aboutMe: {
      get() {
        return this.store.getAboutMe;
      },
      set(payload) {
        return this.store.changedAboutMe(payload);
      },
    },
    shippingAddress: {
      get() {
        return this.store.getShippingAddress;
      },
      set(payload) {
        return this.store.changedShippingAddress(payload);
      },
    },
    profilePicture() {
      return this.store.getProfilePic;
    },
  },
  methods: {
    loadProfileImg(event) {
      // this.profilePicture = URL.createObjectURL(event.target.files[0]);
      // console.log(this.profilePicture);
      this.store.uploadProfileImg(event.target.files[0]);
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
      await this.store.updateProfile(newDetails);
      Swal.fire({
        title: "Success!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500,
      });
    },
    deleteAccount() {
      Swal.fire({
        title: "Are you sure you want to delete your account?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Yes",
        denyButtonText: `No`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          deleteAcc();
          Swal.fire("Succesfully delete account...", "", "success");
          this.$router.push("/login");
        } else if (result.isDenied) {
          Swal.fire("Request canceled", "", "info");
        }
      });
    },
  },
  components: {
    Image,
    Button,
  },
  setup() {
    const store = userProfile();

    return { store };
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

.btnRed {
  background-color: $red;
}
</style>
