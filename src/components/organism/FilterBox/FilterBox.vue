<template>
    <div className="inset-y-0 left-0 w-auto text-left">
        <p className="ml-3 text-xl font-bold">Filter</p>
        <Checkbox choice="Almost New" name="choice1" value="Almost New" />
        <Checkbox choice="Slightly Used" name="choice2" value="Slightly Used" />
        <Checkbox choice="Frequently Used" name="choice3" value="Frequently Used" />
        <Slider />
    </div>
</template>

<script>
import Checkbox from "/@/components/molecule/Checkbox/Checkbox.vue"
import Slider from "/@/components/molecule/Slider/Slider.vue"

export default {
  name: "FilterBox",
  components: {
    Checkbox,
    Slider
  }
}
</script>

<style scoped>

</style>
