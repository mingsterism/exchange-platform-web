<template>
  <!-- <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button> -->
  <p className="p-12 px-52 pb-0 text-left font-semibold text-5xl">User Profile</p>
  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
        <Textbox text="Name" :name="name" :id="name" size="normal" />
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox text="Old Password" :name="old_pass" :id="old_pass" size="normal" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox text="New Password" :name="new_pass" :id="new_pass" size="normal" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox text="Retype New Password" :name="retype" :id="retype" size="normal" />
      </div>
    </div>
    <div className="flex flex-col items-start pb-8">
      <Textbox text="About Me" :name="about" :id="about" size="large" />
    </div>
    <div className="flex flex-col items-start">
      <Textbox text="Shipping Address" :name="shipping" :id="shipping" size="large" />
    </div>
  </div>
  <div>
    <p className="p-12 px-52 text-left font-semibold text-5xl">My Products</p>
  </div>
  <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly">
    <Card :product="p.name" :description="p.description" v-for="p in products" v-bind:key="p" />
  </div>
</template>

<script>
import Card from '/@/components/organism/Card/Card.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'
import Products from "/@/mock/products.json"

export default {
  name: "Profile",
  data() {
    return {
      products: [],
      name: "Name",
      old_pass: 'Old Password',
      new_pass: 'New Password',
      retype: 'Retype New Password',
      about: "About Me",
      shipping: 'Shipping Address',
      age: 10
    }
  },
  created() {
    console.log("PRODUCTS: ", Products)
    this.products = Products
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    handleAdd() {
      this.name = Math.random()
      this.products.push(
          {
            "name": "AAAAA",
            "condition": "",
            "description": "",
            "photos": [
              {
                "url": "",
                "isPrimary": false,
                "meta": "front"
              }
            ]
          })
    //  write this.products to the json file using nodejs fs.writeFile
    }
  },
  components: {
    Card,
    Textbox
  },
}
</script>

<style scoped>

</style>
