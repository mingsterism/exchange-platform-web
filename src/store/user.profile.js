import { defineStore } from "pinia";
import firebase from "firebase/app";
import "firebase/auth";
import { getUserProfileDoc, updateUserProfile } from "../firebase/profile";
import { downloadProfilePic, uploadProfileImage } from "../firebase/storage";

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const userProfile = defineStore("profile", {
  state() {
    return {
      aboutMe: "",
      shippingAddress: "",
      firstName: "",
      lastName: "",
      profilePic: "",
      wallet: null,
      isLogin: false,
    };
  },
  getters: {
    getAboutMe: (state) => {
      return state.aboutMe;
    },
    getShippingAddress: (state) => {
      return state.shippingAddress;
    },
    getFirstName: (state) => {
      return state.firstName;
    },
    getLastName: (state) => {
      return state.lastName;
    },
    getProfilePic: (state) => {
      return state.profilePic;
    },
    getWallet: (state) => {
      return state.wallet;
    },
    getIsLogin: (state) => {
      return state.isLogin;
    },
  },
  actions: {
    getProfile() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          const uid = user.uid;
          const profileDoc = await getUserProfileDoc(uid);
          const userDetails = profileDoc;
          this.changedAboutMe(userDetails.about);
          this.changedFirstName(userDetails.first_name);
          this.changedLastName(userDetails.last_name);
          this.changedShippingAddress(userDetails.address);
          this.changeWallet(userDetails.points);
        } else {
          console.log("Fail to read user profile");
        }
      });
    },
    getProfileImg() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          downloadProfilePic(uid);
        }
      });
    },
    async updateProfile(newDetails) {
      const user = firebase.auth().currentUser;
      if (user !== null) {
        // console.log("User is currently logged in.", user);
        const uid = user.uid;
        // console.log(uid);
        try {
          await updateUserProfile(newDetails, uid);
          // console.log("Successfully update user profile!");
          // this.getProfile();
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("Failed to access user account...");
      }
    },
    uploadProfileImg(file) {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          const uid = user.uid;
          uploadProfileImage(file, uid);
        }
      });
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
    changeProfilePic(payload) {
      this.profilePic = payload;
    },
    changeIsLogin(payload) {
      this.isLogin = payload;
    },
    changeWallet(payload) {
      this.wallet = payload;
    },
  },
});
