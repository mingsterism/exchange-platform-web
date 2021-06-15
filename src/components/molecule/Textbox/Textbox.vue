<template>
  <div class="flex flex-col">
    <label for="name" class="text-gray-600 mt-3 h-auto w-52 text-left p-2">{{ text }}</label>
    <input class="border-4 border-gray-400 rounded-lg p-1.5" type="text" :placeholder="name" :id="idName">
  </div>

</template>

<script>
import './textbox.css'
import {reactive, computed} from 'vue'

export default {
  name: "Textbox",

  props: {
    text: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: false
    },
    id: {
      type: String,
      required: true
    },
    size: String,
    validator: function (value) {
      return ['normal', 'long', 'large'].indexOf(value) !== -1;
    }
  },
  setup(props) {
    props = reactive(props);
    return {
      classes: computed(() => ({
        'storybook-textbox': true,
        [`storybook-textbox--${props.size || 'normal'}`]: true
      })),
    }
  }
}

</script>

<style lang="postcss" scoped>
</style>
