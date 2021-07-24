<template>
  <p>hello</p>
  {{ users.apparel }}
  {{ users.role }}
  {{ users.rounds }}
  {{ users.secret }}
  ---------
  {{ users.numbers }}
  ------
  {{ numberOfApparel }}
  <button @click="handleClick">ADD APPAREL</button>
  <div class="flex items-center ml-52 mt-12">
    <Image class="rounded-full"/>
    <p className="px-20 pb-0 text-left font-semibold text-5xl">User Profile</p>
  </div>

  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
      <Textbox text="Name" :name="name" :id="name" size="normal"/>
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox
            text="Old Password"
            :name="old_pass"
            :id="old_pass"
            size="normal"
        />
      </div>
      <div className="flex flex-col items-start">
        <Textbox
            text="New Password"
            :name="new_pass"
            :id="new_pass"
            size="normal"
        />
      </div>
      <div className="flex flex-col items-start">
        <Textbox
            text="Retype New Password"
            :name="retype"
            :id="retype"
            size="normal"
        />
      </div>
    </div>
    <div className="flex flex-col items-start pb-8">
      <Textbox text="About Me" :name="about" :id="about" size="large"/>
    </div>
    <div className="flex flex-col items-start">
      <Textbox
          text="Shipping Address"
          :name="shipping"
          :id="shipping"
          size="large"
      />
    </div>
  </div>
  <div>
    <div class="flex p-12 justify-around">
      <a className="pl-40 text-left font-semibold text-4xl">My Products</a>
      <a className="px-40 text-left text-4xl">My Purchase</a>
      <a className="pr-40 text-left text-4xl">Add Product</a>
    </div>
    <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly mb-10">
      <Card
          :product="p.name"
          :description="p.description"
          :shipping="p.shipping"
          v-for="p in products"
          :key="p"
      />
    </div>
  </div>
</template>

<script>
import Card from "/@/components/organism/Card/Card.vue";
import Textbox from "/@/components/molecule/Textbox/Textbox.vue";
import Image from "/@/components/molecule/Image/Image.vue";
import {getUserProducts} from "../utils/firebase";
import firebase from "firebase";
import {usersStore} from "/@/store/users.store";
import {mapActions, mapState} from "pinia";

export default {
  name: "Profile",
  setup() {
    const users = usersStore();
    return {
      users
    };
  },
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
          console.log(docs.id);
          console.log(product);
          this.products.push(product);
        });
      } else {
        console.log("user is logged out.");
      }
    });
  },
  computed: {
    ...mapState(usersStore, ["numberOfApparel"]),
  },
  methods: {
    ...mapActions(usersStore, ["addApparel"]),
    handleBack() {
      this.$router.go(-1);
    },
    handleClick() {
      this.addApparel("test");
    },
  },
  components: {
    Card,
    Textbox,
    Image,
  },
};
</script>

<style scoped></style>
