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
        <Textbox :name="name" text="Old Password" />
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
      <a className="pl-40 text-left text-4xl">My Products</a>
      <a className="px-40 text-left text-4xl">My Purchase</a>
      <a className="pr-40 text-left font-semibold text-4xl">Add Product</a>
    </div>
    <div class="flex flex-wrap px-52 gap-10">
        <Image id="image1" />
        <Image id="image2" />
        <Image id="image3" />
        <Image id="image4" />
        <Image id="image5" />
        <Image id="image6" />
        <!-- Need to add a 'add image' feature later -->
    </div>
  </div>
  <form @submit.prevent="handleSubmit">
    <div class="flex flex-col items-start px-52">
      <!-- <Textbox text="Name" name="Name" idName="productName" /> -->
      <label for="name" className="mt-3 p-2 h-auto w-52 text-gr0 text-left">Name</label>
      <input type="text" name="name" placeholder="Name" className="storybook-textbox" v-model="form.name" />
      <!-- <div class="flex">
          <Textbox text="Points" name="Points" idName="productPoints" />
          <Dropdown class="pl-10 pt-7" />
      </div>
      <Textbox text="Description" name="Please enter item descriptions here." idName="productDescription" /> -->
      <div class="mt-7">
          <Button type="submit" label="Add" primary=true  />
      </div>
    </div>
  </form>
  <div id="msg">
    <pre></pre>
  </div>
</template>

<script>
import Card from '/@/components/organism/Card/Card.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'
import Products from "/@/mock/products.json"
import Image from "/@/components/molecule/Image/Image.vue"
import Dropdown from "/@/components/molecule/Dropdown/Dropdown.vue"
import Button from "/@/components/molecule/Button/Button.vue"
import { warn } from '@vue/runtime-core'
import Playground from "/@/mock/playground.json"
import {createProfile} from "../../firebase"
import {reactive} from 'vue'

export default {
  name: "Profileadd",
  data() {
    return {
      name: "*********",
    }
  },
  // created() {
  //   console.log("PRODUCTS: ", Products)
  //   this.products = Products
  // },
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  },
  setup() {
    const form = reactive({name: ''}) // form.name

    const handleSubmit = async () => {
      await createProfile({...form})
      form.name = ''
    }

    return {
      form,
      handleSubmit
    }
    // handleSubmit: async () => {
    //   await createProfile({...form})
    //   form.name = ''
    // },
    // handleAdd() {
    //   const fs = require('fs');
    //   let addProductDetail = {
    //     name: document.querySelector("#productName").value,
    //     points: document.querySelector("#productPoints").value,
    //     condition: document.querySelector("#productCondition").value,
    //     description: document.querySelector("#productDescription").value
    //   }
    //   fs.writeFile('/@/mock/playground.json', JSON.stringify(addProductDetail, null, 2), err => {
    //     if (err) {
    //       console.log(err);
    //     } else {
    //       console.log("File successfully written!");
    //     }
    //   })
    //   this.name = Math.random()
    //   this.products.push(
    //       {
    //         "name": "AAAAA",
    //         "condition": "",
    //         "description": "",
    //         "photos": [
    //           {
    //             "url": "",
    //             "isPrimary": false,
    //             "meta": "front"
    //           }
    //         ]
    //       })
    // //  write this.products to the json file using nodejs fs.writeFile
  //   }
  },
  components: {
    Card,
    Textbox,
    Image,
    Dropdown,
    Button
  },
}
</script>

<style scoped>

</style>
