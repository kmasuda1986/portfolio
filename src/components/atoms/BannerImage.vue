<template>
  <v-img height="200px" :src="props.src ? props.src : '../no_picture.jpeg'" />
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomsBannerImage',

  props: {
    src: {
      type: String,
      required: false,
      default: '',
    },
  },

  setup(props) {
    return {
      props,
    }
  },
})
</script>
