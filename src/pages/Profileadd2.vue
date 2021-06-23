<template>
  <div class="flex items-center ml-52 mt-12">
    <div>
      <Image :src="profilePicture" class="rounded-full" />
      <div class="relative left-10 bottom-5">
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
            class="opacity-0 border-2 border-gray-500 rounded-md p-1 bg-gray-200 text-xs font-semibold hover:opacity-100"
            for="file"
            style="cursor: pointer"
            >Upload Image</label
          >
        </p>
      </div>
    </div>
    <p className="px-20 pb-0 text-left font-semibold text-5xl">User Profile</p>
  </div>
  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
      <Textbox :name="userName" text="Name" />
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox :name="name" text="Old Password" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox :name="name" text="New Password" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox :name="name" text="Retype New Password" />
      </div>
    </div>
    <div className="flex flex-col items-start pb-8">
      <Textbox :name="aboutUser" text="About Me" />
    </div>
    <div className="flex flex-col items-start">
      <Textbox :name="shipAdd" text="Shipping Address" />
    </div>
  </div>
  <div>
    <div class="flex p-12 justify-around">
      <a className="pl-40 text-left text-4xl">My Products</a>
      <a className="px-40 text-left text-4xl">My Purchase</a>
      <a className="pr-40 text-left font-semibold text-4xl">Add Product</a>
    </div>
    <div
      class="flex flex-wrap items-start mx-52 gap-10 border-2 p-2"
      id="productImgCont"
    >
      <!-- index to point at the items -->
      <Image v-for="image in images" :key="image.id" :src="image.src" />
      <div class="flex flex-col justify-around h-48">
        <input
          class="hidden"
          type="file"
          accept="image/*"
          name="image"
          id="uploadProductImg"
          @change="uploadProductImage($event)"
        />
        <label
          class="border-2 border-gray-400 p-2 rounded-md"
          for="uploadProductImg"
          style="cursor: pointer"
          >Upload</label
        >
        <input
          class="hidden"
          type="button"
          name="popImage"
          id="popProductImage"
          @click="popProductImage($event)"
        />
        <label
          class="border-2 border-gray-400 p-2 rounded-md"
          for="popProductImage"
          style="cursor: pointer"
          >Delete</label
        >
      </div>
      <!-- always create an array to store the src/data instead of using raw DOMs -->
    </div>
  </div>
  <form @submit.prevent="handleSubmit">
    <!-- .prevent prevents the default submission of the form -->
    <div class="flex flex-col items-start px-52">
      <Textbox text="Name" name="Name" nametag="productName" />
      <!-- <label for="name" className="mt-3 p-2 h-auto w-52 text-gr0 text-left">Name</label>
      <input type="text" name="name" placeholder="Name" className="storybook-textbox" v-model="form.name" /> -->
      <div class="flex">
        <Textbox text="Points" name="Points" nametag="productPoints" />
        <Dropdown class="pl-10 pt-7" />
      </div>
      <Textbox
        text="Description"
        name="Please enter item descriptions here."
        nametag="productDescription"
        size="large"
      />
      <div class="mt-7">
        <Button type="submit" label="Add" :primary="true" />
      </div>
    </div>
  </form>
  <!-- <div id="msg">
    <pre></pre>
  </div> -->
</template>

<script>
import Card from '/@/components/organism/Card/Card.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'
import Image from "/@/components/molecule/Image/Image.vue"
import Dropdown from "/@/components/molecule/Dropdown/Dropdown.vue"
import Button from "/@/components/molecule/Button/Button.vue"
import {getCurrentInstance, onBeforeMount, reactive, ref} from 'vue'
import { createProduct, currentUser } from 'src/utils/firebase'

export default {
  name: "Profileadd",
  data() {
    return {
      // name: "*********",
      // images: [
      //   {
      //     id: "1",
      //     src: "https://images.theconversation.com/files/371985/original/file-20201130-13-xieqc.jpg?ixlib=rb-1.1.0&rect=0%2C0%2C5129%2C2560&q=45&auto=format&w=668&h=324&fit=crop",
      //   },
      // ],
      // profilePicture: "https://images.csmonitor.com/csm/2020/10/1109550_1_1005-seal-maine_standard.jpg?alias=standard_900x600",
      // addProductDetails: [],
      // productName: "",
      // productPoints: "",
      // productDescription: "",
      // condition: "",
      // userName: "",
      // shipAdd: "",
      // aboutUser: "",
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1)
    },
    handleSubmit(event){
      // takes the data from the form and put it into a suitable format using
      // Object.fromentries to grab individual input and destructure it
      // name attribute must be given in each input
      let testProduct;
      const {productName, productPoints, condition, productDescription} = Object.fromEntries(new FormData(event.target));
      this.productName = productName;
      this.productPoints = productPoints;
      this.condition = condition;
      this.productDescription = productDescription;
      // to see the values generated
      console.log(this.productName, this.productPoints, this.condition, this.productDescription);
      this.addProductDetails.push({
        id: Date.now(),
        name: this.productName,
        points: this.productPoints,
        conditions: this.condition,
        description: this.productDescription,
        status: "true",
        photos: this.images
      })
      // to check whether it is stored into addProductDetails
      console.log(this.addProductDetails);
      // adding objects into testProduct variable
      testProduct = {
        id: Date.now(),
        name: this.productName,
        points: this.productPoints,
        conditions: this.condition,
        description: this.productDescription,
        status: "true",
        photos: this.images
      }
      // storing the data into the firestore
      // for status, true means product is available
      // false means product is in shipping, shipped or paid
      // const user = currentUser();
      
      if (user !== null) {
        const uid = user.uid;
        // const newProduct = db.collection("userProfile").doc(uid).collection('products').add(this.addProductDetails)
        // create new document with info from testProduct into the subCollection
        createProduct(testProduct, uid).then(function() {
        console.log("product created.");
        })
      }

      // need to add in a pop-up msg to show is successfully added
      // and refresh the entire entry to initial state
      // need create a storage link to store images
      // link the user ID with their products
    },
    loadProfileImg: function(event) {
      this.profilePicture = URL.createObjectURL(event.target.files[0])
      console.log(this.profilePicture);

      // need to store the image and load it when user logins
    },
    uploadProductImage: function(event) {
      if (this.images.length <= 6) {
        this.images.push(
          {
            id: Date.now(),
            src: URL.createObjectURL(event.target.files[0])
          }
          )
        console.log(this.images);
      }
    },
    popProductImage: function(event) {
      if (this.images.length > -1) {
        this.images.pop()
      }
      console.log(this.images);
    }
  },
  setup() {
    
    // const user = firebase.auth().currentUser;
    // if (user) {
    //   this.shipAdd = user.shippingAddress;
    //   this.userName = user.name;
    //   this.aboutUser = user.aboutMe;
    // }

    // onBeforeMount(() => {
    //   const user = currentUser();
    //   console.log("USER: ", user)
    //   if (user) {
    //     this.shipAdd = user.shippingAddress;
    //     this.userName = user.name;
    //     this.aboutUser = user.aboutMe;
    //   }
    // });

  //   // const form = reactive({id: '', name: '', points: '', condition: '', description: '', productImages: ''}) // form.name

  //   const handleSubmit = async () => {
  //     await createProduct({...form})
  //     form.name = ''
  //   }

    // return {
    //   shipAdd,
    //   userName,
    //   aboutUser
    // }
  //   // handleSubmit: async () => {
  //   //   await createProfile({...form})
  //   //   form.name = ''
  //   // },
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

<style scoped></style>
