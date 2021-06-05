<template>
  <li className="flex ml-2 mt-6 items-center">
    <input className="form-checkbox h-6 w-6 ml-1" type="checkbox" id={{name}} name={{name}} value={{value}}/>
    <label className="text-lg ml-2" for="choice1">{{ choice }}</label>
  </li>
</template>

<script>
export default {
  name: "Checkbox",

  props: {
    choice: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true
    },
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="css" scoped>
li {
  list-style-type: none;
}
</style>
