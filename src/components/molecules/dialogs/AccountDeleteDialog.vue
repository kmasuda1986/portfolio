<template>
  <BaseDialog
    ref="baseDialog"
    title="アカウント削除"
    width="500"
    persistent
    hide-close-btn
  >
    <template #body>
      <v-card-text
        class="pt-5"
      >
        <p>
          アカウントを削除しますか？<br>
          削除すると復元ができません。
        </p>
        <v-btn
          color="light-blue"
          outlined
          block
          @click="$emit('deleteAccount')"
        >
          アカウントを削除する
        </v-btn>
        <v-btn
          class="mt-2"
          color="red"
          text
          block
          @click="close"
        >
          キャンセル
        </v-btn>
      </v-card-text>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MoleculesDialogsAcountDeleteDialog',

  components: {
    BaseDialog: () => import('~/components/molecules/dialogs/BaseDialog.vue')
  },

  setup() {
    /** BaseDialog */
    const baseDialog = ref(null)

    /**
     * open
     */
    const open = () => {
      const refs: any = baseDialog.value
      refs.open()
    }

    /**
     * close
     */
    const close = () => {
      const refs: any = baseDialog.value
      refs.close()
    }

    return {
      baseDialog,
      open,
      close
    }
  },
})
</script>

