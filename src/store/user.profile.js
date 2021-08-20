import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/auth";
import { getUserProfileDoc, updateUserProfile } from "../utils/firebase";

// useStore could be anything like useUser, useCart
export const userProfile = defineStore({
  // unique id of the store across your application
  id: "userProfile",
  state() {
    return {
      aboutMe: "",
      shippingAddress: "",
      firstName: "",
      lastName: "",
    };
  },
  getters: {
    setAboutMe: (state) => {
      return state.aboutMe;
    },
    setShippingAddress: (state) => {
      return state.shippingAddress;
    },
    setFirstName: (state) => {
      return state.firstName;
    },
    setLastName: (state) => {
      return state.lastName;
    },
  },
  actions: {
    async getProfile() {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        console.log("User is currently logged in.", user);
      }
      const profileDoc = await getUserProfileDoc(user.uid);
      const userDetails = profileDoc;
      console.log(userDetails);
      this.aboutMe = userDetails.about;
      this.shippingAddress = userDetails.address;
      this.firstName = userDetails.first_name;
      this.lastName = userDetails.last_name;
      console.log(
        this.aboutMe,
        this.shippingAddress,
        this.firstName,
        this.lastName
      );
    },
    async updateProfile(firstName, lastName, aboutMe, shippingAddress) {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        console.log("User is currently logged in.", user);
        const uid = user.uid;
        // console.log(uid);
        try {
          await updateUserProfile(
            firstName,
            lastName,
            aboutMe,
            shippingAddress,
            uid
          );
          console.log("Successfully update user profile!");
          // this.getProfile();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Failed to access user account...");
      }
    },
    changedFirstName(payload) {
      this.firstName = payload;
    },
    changedLastName(payload) {
      this.lastName = payload;
    },
    changedAboutMe(payload) {
      this.aboutMe = payload;
    },
    changedShippingAddress(payload) {
      this.shippingAddress = payload;
    },
  },
});
