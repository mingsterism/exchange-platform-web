<template>
<div>
  <div className="text-left p-10 pt-24 pl-14">
    <p className="text-5xl font-semibold">MarketPlace</p>
  </div>
  <div className="flex flex-col md:flex-row">
    <div className="pl-11">
      <FilterBox />
    </div>
    <div className="px-20 pb-10 flex flex-wrap gap-9 justify-evenly">
      <Card product="Product A" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product B" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product C" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product D" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product E" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
      <Card product="Product F" description="Lorem Ipsum is simply dummy text of the printing and typesetting industry."/>
    </div>
  </div>
</div>
</template>

<script>
import FilterBox from '/@/components/organism/FilterBox/FilterBox.vue'
import Card from '/@/components/organism/Card/Card.vue'

export default {
  name: "Home",
  components: {
    FilterBox,
    Card,
  },
  methods: {
    handleClick() {
      this.$router.push("/profile")
    },
  }
}
</script>

<style scoped>

</style>
