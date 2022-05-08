<template>
  <v-snackbar v-model="isOpen" :color="color" timeout="3000" outlined>
    <v-icon :color="color"> mdi-spin mdi-octagram </v-icon>
    {{ message }}
  </v-snackbar>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'AtomsTheSnackbar',

  props: {
    color: {
      type: String,
      required: false,
      default: 'success',
    },
  },

  setup() {
    /** Open flug */
    const isOpen = ref<boolean>(false)

    /** Text */
    const message = ref<string>('')

    /**
     * open
     */
    const open = (text: string) => {
      message.value = text
      isOpen.value = true
    }

    return {
      isOpen,
      message,
      open,
    }
  },
})
</script>
