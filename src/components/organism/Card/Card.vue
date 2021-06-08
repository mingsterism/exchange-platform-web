<template>
  <div className="shadow-md w-80">
    <img src="https://i.imgur.com/hghfnW9.jpg" className="p-0"/>
    <div>
      <div className="py-4 p-3 text-left">
        <div className="flex flex-row justify-between pb-2">
          <p className="text-2xl font-semibold">{{product}}</p>
          <p className="mr-2 text-lg font-semibold self-center bg-red-100">{{shipping}}</p>
        </div>
        <p className="min-h-36">{{description}}</p>
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
  },
  props: {
    product: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    shipping: {
      type: String,
      required: true,
      validator: function (value) {
        return ['Shipping', 'Shipped', 'Paid'].indexOf(value) !== -1
      }
    }
  }
}
</script>

<style scoped>

</style>
