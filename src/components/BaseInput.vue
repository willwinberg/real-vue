<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <input
      type="text"
      :value="value"
      @input="updateValue"
      v-on="listeners"
      v-bind="$attrs"
    />
  </div>
</template>

<script>
import { formFieldMixin } from '../mixins/formFieldMixin'
export default {
  mixins: [formFieldMixin],
  computed: {
    // this is so v-on and @input do not conflict
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue
      }
    }
  }
}
</script>
