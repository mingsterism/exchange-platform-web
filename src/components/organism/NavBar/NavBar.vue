<template>
  <div class="bg-red-600">
    <h1>
      I AM NAVBAR
    </h1>
    -p------------------
    <Button label="SUBMIT" />
    <Button label="APPLY" :primary="true" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" :primary="true" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
    <Button label="SUBMIT" />
  </div>

</template>

<script>
import Button from "/@/components/molecule/Button/Button.vue"
export default {
  name: "NavBar",
  components: {
    Button
  }
}
</script>

<style scoped>

</style>