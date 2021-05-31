<template>
  <li className="flex my-4 text-base items-center">
    <input className="w-5 h-5 m-3" type="checkbox" id="choice1" name="choice1" value="value1" />
    <label for="choice1" className="mt-0.5">Choice 1</label>
  </li>
</template>

<script>
export default {
  name: "Checkbox"
}
</script>

<style lang="css" scoped>
li {
  list-style-type: none;
}

input.checkmark {
  width: 1.2rem;
  height: 1.2rem;
  margin-right: 0.7rem;
}

.checkbox label {
  padding-bottom: 1rem;
}
</style>
