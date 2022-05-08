<template>
  <BaseDialog
    ref="baseDialog"
    title="アカウント登録"
    width="500"
    persistent
    hide-close-btn
  >
    <template #body>
      <v-card-text class="pt-5">
        <p>サービスを利用する場合は、アカウント登録が必要です。</p>
        <p>
          登録することで、
          <a target="_blank" href="/legal/terms"> 利用規約 </a>
          及び
          <a target="_blank" href="https://vuetifyjs.com">
            プライバシーポリシー
          </a>
          に同意するものとします。
        </p>
        <v-btn
          color="light-blue"
          outlined
          block
          @click="$emit('createAccount')"
        >
          アカウントを作成する
        </v-btn>
        <v-btn class="mt-2" color="red" text block @click="$emit('cancel')">
          キャンセル
        </v-btn>
      </v-card-text>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MoleculesDialogsAcountCreateDialog',

  components: {
    BaseDialog: () => import('~/components/molecules/dialogs/BaseDialog.vue'),
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
      close,
    }
  },
})
</script>
