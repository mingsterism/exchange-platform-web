<template>
    <div className="absolute inset-y-0 left-0 w-auto text-left">
        <p className="m-3 text-xl font-bold">Filter</p>
        <Checkbox choice="Choice 1" />
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
