<template>
  <v-avatar :size="props.size">
    <v-img :src="props.src ? props.src : '../no_picture.jpeg'" />
  </v-avatar>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomsThaAvatar',

  props: {
    src: {
      type: String,
      required: false,
      default: '',
    },
    size: {
      type: Number,
      required: false,
      default: 100,
    },
  },

  setup(props) {
    return {
      props,
    }
  },
})
</script>
