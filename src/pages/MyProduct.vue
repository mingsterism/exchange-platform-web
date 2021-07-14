<template>
  <div>
    <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly mb-10">
      <transition-group name="card">
      <Card :post="post" v-for="post, index in products" :key="index" />
      </transition-group>
    </div>
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue";
import { getUserProducts } from "../utils/firebase";
import firebase from "firebase";

export default {
  name: "MyPurchase",
  data() {
    return {
      products: [],
      name: "Name",
      old_pass: "Old Password",
      new_pass: "New Password",
      retype: "Retype New Password",
      about: "About Me",
      shipping: "Shipping Address",
      age: 10,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged(async (user) => {
      if (user) {
        console.log("user is logged in: ", user);
        console.log(user.displayName);
        const uid = user.uid;
        const listOfProducts = getUserProducts(uid);
        const productDocs = (await listOfProducts).docs;
        productDocs.forEach((docs) => {
          const product = docs.data();
          console.log(product);
          this.products.push(product);
        });
      } else {
        console.log("user is logged out.");
      }
    });
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
  },
  components: {
    Card,
  },
  setup() {

  }
};
</script>

<style scoped>
  .card-enter-from {
    transform: scale(0);
  }

  .card-enter-active {
    transition: all 2.0s ease;
  }
</style>
