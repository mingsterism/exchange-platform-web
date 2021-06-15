<template>
  <div className="flex flex-col">
    <label for="name" className="mt-3 p-2 h-auto w-52 text-gray-600 text-left">{{ text }}</label>
    <input :placeholder="name" :class="classes" :id="id" />
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
