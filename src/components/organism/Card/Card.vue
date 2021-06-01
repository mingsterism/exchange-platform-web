<template>
  <div className="shadow-md w-80">
    <img src="https://i.imgur.com/hghfnW9.jpg" className="p-0"/>
    <div>
      <div className="py-4 p-3 text-left">
        <p className="pb-2 text-2xl font-semibold">Product Name</p>
        <p className="h-36">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et do...</p>
      </div>
    <div className="pb-4">
      <Button label="Button" :primary="true" size="medium" />
    </div>
    </div>
  </div>
</template>

<script>
import Button from "../../molecule/Button/Button.vue"
export default {
  name: "Card",
  components: {
    Button
  }
}
</script>

<style scoped>

</style>
