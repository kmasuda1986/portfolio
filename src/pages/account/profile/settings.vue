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
          v-model="accountData.walletAddress"
          label="Wallet address"
          disabled
          outlined
        />
        <v-text-field
          v-model="accountData.username"
          label="Username"
          outlined
        />
        <v-btn
          color="light-blue"
          :loading="saveBtnLoading"
          outlined
          @click="onSave"
        >
          保存
        </v-btn>
      </v-col>
    </v-row>
    <v-row justify="center" align="center">
      <v-col cols="12" md="6">
        <v-btn
          color="red"
          outlined
          :loading="saveBtnLoading"
          @click="openAccountDeleteDialog"
        >
          アカウントを削除
        </v-btn>
      </v-col>
    </v-row>
    <AccountDeleteDialog ref="accountDeleteDialog" @deleteAccount="onDelete" />
    <TheSnackbar ref="theSnackbar" :color="theSnackbarColor" />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  useAsync,
  useRouter,
} from '@nuxtjs/composition-api'
import useAccount from '~/composable/useAccount'
import useWallet from '~/composable/useWallet'
import { Account } from '~/types/index'

export default defineComponent({
  name: 'AccountProfileSettings',

  components: {
    AccountDeleteDialog: () =>
      import('~/components/molecules/dialogs/AccountDeleteDialog.vue'),
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
  },

  middleware: ['auth'],

  setup() {
    /** Use router */
    const router = useRouter()

    /** Use account */
    const account = useAccount()

    /** Use wallet */
    const wallet = useWallet()

    /** Account data */
    const accountData = ref<Account>({
      id: '',
      walletAddress: '',
      username: '',
      profileImageUri: '',
      profileBannerUri: '',
      description: '',
    })

    /** Save buttom loading flug */
    const saveBtnLoading = ref<boolean>(false)

    /** Account delete dialog */
    const accountDeleteDialog = ref<any>(null)

    /** The snackbar */
    const theSnackbar = ref<any>(null)

    /** The snackbar color */
    const theSnackbarColor = ref<string>('')

    const openAccountDeleteDialog = () => {
      const refs: any = accountDeleteDialog.value
      refs.open()
    }

    /**
     * Get account
     */
    const getAccount = useAsync(async () => {
      const { data }: any = await account.findOne({
        walletAddress: {
          eq: wallet.getWalletAddress(),
        },
      })

      accountData.value = {
        id: data.id,
        walletAddress: wallet.getWalletAddress(),
        username: data.username,
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
        }, 2000)
      } catch (error: any) {
        theSnackbarColor.value = 'error'
        theSnackbar.value.open(error.message)
      }
    }

    /**
     * onDelete
     *
     * @returns Promise<any>
     */
    const onDelete = async (): Promise<any> => {
      await account.destroy(accountData.value.id)

      router.push('/account/profile/delete')
    }

    return {
      accountData,
      saveBtnLoading,
      accountDeleteDialog,
      theSnackbar,
      theSnackbarColor,
      openAccountDeleteDialog,
      getAccount,
      onSave,
      onDelete,
    }
  },
})
</script>
