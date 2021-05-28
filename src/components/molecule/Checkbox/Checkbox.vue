<template>
  <li className="checkbox">
    <input className="checkmark" type="checkbox" id="choice1" name="choice1" value="value1" />
    <label for="choice1">Choice 1</label>
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

.checkbox {
  display: block;
  position: relative;
  margin-bottom: 1rem;
  margin-top: 1rem;
  font-size: 1.5rem;
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
