<template>
  <!-- <router-link to="test1" class="bg-green-400">GO TO TEST1</router-link>
  ---------------
  <button @click="handleBack" class="bg-red-400">BACK</button> -->
  <div className="p-12 pb-12">
    <ProfileCard />
  </div>
  <div>
    <p className="p-12 px-52 text-left font-semibold text-5xl">Similar Products</p>
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
import ProfileCard from '/@/components/organism/ProfileCard/ProfileCard.vue'
import Card from '/@/components/organism/Card/Card.vue'

export default {
  name: "Product",
  methods: {
    handleBack() {
      this.$router.go(-1)
    }
  },
  components: {
    ProfileCard,
    Card
  }
}
</script>

<style scoped>

</style>
