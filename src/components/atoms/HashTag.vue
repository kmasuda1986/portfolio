<template>
  <v-chip
    label
    small
    v-text="`# ${props.text}`"
  />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomsHashTag',

  props: {
    text: {
      type: String,
      required: true
    }
  },

  setup(props) {
    return {
      props
    }
  }
})
</script>

