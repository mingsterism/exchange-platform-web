<template>
  <li class="flex ml-2 mt-6 items-center" className="checkbox">
    <input class="form-checkbox h-6 w-6 ml-2" className="checkmark" type="checkbox" id="choice1" name="choice1" value="value1"/>
    <label class="text-lg ml-2" for="choice1">{{ choice }}</label>
  </li>
</template>

<script>
export default {
  name: "Checkbox",

  props: {
    choice: {
      type: String,
      required: true,
    }
  }
}
</script>

<style lang="css" scoped>
li {
  list-style-type: none;
}
</style>
