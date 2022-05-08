<template>
  <BaseDialog ref="baseDialog" title="My wallet">
    <template #body>
      <v-card-text class="pt-5">
        <div>
          <h2 class="pb-1 white--text">Wallet address</h2>
          <p class="mb-0" v-text="props.walletAddress" />
        </div>
      </v-card-text>
    </template>
  </BaseDialog>
</template>

<script lang="ts">
import { defineComponent, ref } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'MoleculesDialogsWalletInfoDialog',

  components: {
    BaseDialog: () => import('~/components/molecules/dialogs/BaseDialog.vue'),
  },

  props: {
    walletAddress: {
      type: String,
      required: true,
    },
  },

  setup(props) {
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
      props,
      baseDialog,
      open,
      close,
    }
  },
})
</script>
