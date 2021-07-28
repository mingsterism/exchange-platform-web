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
    displayProfileInfo() {
      firebase.auth().onAuthStateChanged(async (user) => {
        if (user) {
          console.log("User is currently logged in.");
          const profileDoc = await getUserProfileDoc();
          if (profileDoc.empty) {
            console.log("This user does not exist!");
          } else {
            profileDoc.forEach((doc) => {
              const userDetails = doc.data();
              console.log(userDetails);
              return (this.aboutMe = userDetails.about, this.shippingAddress = userDetails.address, this.firstName = userDetails.first_name, this.lastName = userDetails.last_name)
            });
          }
        } else {
          console.log("This user has been logged put.");
        }
      });
    },
  },
  actions: {
    async updateProfile() {
      try {
        await updateUserProfile(
          this.aboutMe,
          this.shippingAddress,
          this.firstName,
          this.lastName
        );
        console.log("Successfully update user profile!");
        this.displayProfileInfo;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
