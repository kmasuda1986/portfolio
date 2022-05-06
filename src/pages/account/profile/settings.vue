<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <h2><span class="light-blue--text">P</span>rofile settings</h2>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-text-field
          v-model="account.walletAddress"
          label="Wallet address"
          disabled
          outlined
        />
        <v-text-field
          v-model="account.username"
          label="Username"
          outlined
        />
        <v-btn
          color="light-blue"
          :loading="saveBtnLoading"
          @click="onSave"
        >
          save
        </v-btn>
      </v-col>
    </v-row>
    <TheSnackbar
      ref="theSnackbar"
      :color="theSnackbarColor"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync } from '@nuxtjs/composition-api'
import useWallet from '~/composable/useWallet'
import { Account } from '~/types/index'

export default defineComponent({
  name: 'AccountProfileSettings',

  components: {
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
  },

  middleware: ['auth'],

  setup() {
    /** Use wallet */
    const wallet = useWallet()

    /** Account data */
    const account = ref<Account>()

    /** Save buttom loading flug */
    const saveBtnLoading = ref<boolean>(false)

    /** The snackbar */
    const theSnackbar = ref<any>(null)

    /** The snackbar color */
    const theSnackbarColor = ref<string>('')

    /**
     * Get account
     */
    const getAccount = useAsync(() => {
      account.value = {
        walletAddress: wallet.getWalletAddress(),
        username: '',
        profileImageUri: '',
        profileBannerUri: '',
        description: '',
      }
    })

    /**
     * onSave
     *
     * @returns Promise<any>
     */
    const onSave = async (): Promise<any> => {
      try {
        saveBtnLoading.value = true
        await setTimeout(() => {
          theSnackbarColor.value = 'success'
          theSnackbar.value.open('更新に成功しました。')
          saveBtnLoading.value = false
        }, 2000);
      } catch (error: any) {
        theSnackbarColor.value = 'error'
        theSnackbar.value.open(error.message)
      }
    }

    return {
      account,
      saveBtnLoading,
      theSnackbar,
      theSnackbarColor,
      getAccount,
      onSave
    }
  },
})
</script>

