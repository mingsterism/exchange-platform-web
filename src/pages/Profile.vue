<template>
  <!-- <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button> -->
  <button class="bg-red-300" @click="handleAdd">ADD PRODUCT</button>
  {{ products }} ----------
  {{ name }}
  {{ age }}
  <p className="p-12 px-52 pb-0 text-left font-semibold text-5xl">User Profile</p>
  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
      <Textbox name="Name" text="Name"/>
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox text="Old Password" :name="name"/>
      </div>
      <div className="flex flex-col items-start">
        <Textbox name="Name" text="New Password"/>
      </div>
      <div className="flex flex-col items-start">
        <Textbox name="Name" text="Retype New Password"/>
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
    <p className="p-12 px-52 text-left font-semibold text-5xl">My Products</p>
  </div>
  <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly">
    <Card :product="p.name"
          :description="p.description"
          v-for="(p, index) in products"
    />
<!--    <Card product="Product B" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product C" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product D" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
<!--    <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>-->
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
      name: "JOEMA",
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
