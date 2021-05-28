<template>
  <div>
    <img />
    <div>
      <h1>Product A</h1>
      <span>Product A description</span>
    </div>
    <div>
      <h3>Condition</h3><span>New</span>
      <h3>Condition</h3>
    </div>
    <Button />
    <Checkbox />
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue"
import Checkbox from "../../molecule/Checkbox/Checkbox.vue"
export default {
  name: "Card",
  components: {
    Button,
    Checkbox
  }
}
</script>

<style scoped>

</style>
