<template>
  <div class="flex items-center ml-52 mt-12">
    <Image class="rounded-full" />
    <p className="px-20 pb-0 text-left font-semibold text-5xl">User Profile</p>
  </div>
  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
      <Textbox name="Name" text="Name"/>
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox text="Old Password" :name="name"/>
      </div>
      <div className="flex flex-col items-start">
        <Textbox :name="name" text="New Password"/>
      </div>
      <div className="flex flex-col items-start">
        <Textbox :name="name" text="Retype New Password"/>
      </div>
    </div>
    <div className="flex flex-col items-start pb-8">
      <Textbox name="Name" text="About Me"/>
    </div>
    <div className="flex flex-col items-start">
      <Textbox name="Name" text="Shipping Address"/>
    </div>
  </div>
  <div>
    <div class="flex p-12 justify-around">
      <a className="pl-40 text-left font-semibold text-4xl">My Products</a>
      <a className="px-40 text-left text-4xl">My Purchase</a>
      <a className="pr-40 text-left text-4xl">Add Product</a>
    </div>
    <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly">
      <Card :product="p.name" :description="p.description" v-for="p in products" v-bind:key="p" />
    </div>
  </div>
</template>

<script>
import Card from '/@/components/organism/Card/Card.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'
import Products from "/@/mock/products.json"
import Image from "/@/components/molecule/Image/Image.vue"

export default {
  name: "Profile",
  data() {
    return {
      products: [],
      name: "*********",
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
    Textbox,
    Image
  },
}
</script>

<style scoped>

</style>
