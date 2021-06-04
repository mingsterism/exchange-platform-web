<template>
  <!-- <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button> -->
  <p className="p-12 px-52 pb-0 text-left font-semibold text-5xl">User Profile</p>
  <div className="flex flex-col items-start p-12 px-52">
    <div className="flex flex-col items-start pb-8">
      <Textbox name="Name" text="Name" />
    </div>
    <div className="flex flex-row gap-20 pb-8">
      <div className="flex flex-col items-start">
        <Textbox name="Name" text="Old Password" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox name="Name" text="New Password" />
      </div>
      <div className="flex flex-col items-start">
        <Textbox name="Name" text="Retype New Password" />
      </div>
    </div>
    <div className="flex flex-col items-start pb-8">
      <Textbox name="Name" text="About Me" />
    </div>
    <div className="flex flex-col items-start">
      <Textbox name="Name" text="Shipping Address" />
    </div>
  </div>
  <div>
    <p className="p-12 px-52 text-left font-semibold text-5xl">My Products</p>
  </div>
  <div className="px-48 pb-10 flex flex-wrap gap-9 justify-evenly">
    <Card product="Product A" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product B" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product C" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product D" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
  </div>
</template>

<script>
import Card from '/@/components/organism/Card/Card.vue'
import Textbox from '/@/components/molecule/Textbox/Textbox.vue'

export default {
  name: "Profile",
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  },
  components: {
    Card,
    Textbox
  }
}
</script>

<style scoped>

</style>
