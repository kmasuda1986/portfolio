<template>
  <v-dialog
    v-model="isOpen"
    :width="width"
  >
    <v-card
      outlined
    >
      <v-toolbar
        color="light-blue"
        elevation="0"
        tile
      >
        <v-toolbar-title v-text="props.title" />
        <v-spacer />
        <v-btn
          icon
          dark
          @click="isOpen = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <slot name="body" />
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MoleculesDialogsBaseDialog',

  props: {
    title: {
      type: String,
      required: true
    },
    width: {
      type: String,
      required: false,
      default: '300'
    }
  },

  setup(props) {
    /** Open flug */
    const isOpen = ref(false)

    /**
     * open
     */
    const open = () => {
      isOpen.value = true
    }

    /**
     * close
     */
    const close = () => {
      isOpen.value = false
    }

    return {
      props,
      isOpen,
      open,
      close
    }
  },
})
</script>

