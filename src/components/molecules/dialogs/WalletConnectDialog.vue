<template>
  <BaseDialog
    ref="baseDialog"
    title="Connect wallet"
  >
    <template #body>
      <v-card-text
        class="pt-5"
        align="center"
      >
        <v-img
          width="150px"
          src="./image/metamask-fox.svg"
        />
        <p>
          ウォレットに接続するとサイドメニューが解放されます。
        </p>
        <v-btn
          color="light-blue"
          block
          outlined
          @click="$emit('connectWallet')"
        >
          接続する
        </v-btn>
      </v-card-text>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MoleculesDialogsWalletConnectDialog',

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

