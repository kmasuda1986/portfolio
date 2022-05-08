<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="6">
        <h2><span class="light-blue--text">P</span>rofile</h2>
      </v-col>
      <v-col class="text-right" cols="6">
        <v-btn
          to="/account/profile/settings"
          color="light-blue"
          outlined
        >
          設定
        </v-btn>
      </v-col>
      <v-col cols="12">
        <v-card flat>
          <BannerImage :src="accountData.profileBannerUri" />
          <v-card-text class="text-center">
            <p class="light-blue--text text-4xl font-semibold">
              {{ accountData.username }}
            </p>
            <AvatarImage
              class="mb-4"
              :src="accountData.profileImageUri"
            />
            <v-text-field
              v-model="accountData.walletAddress"
              prepend-inner-icon="mdi-wallet"
              append-outer-icon="mdi-content-copy"
              outlined
              dense
              readonly
              @click:append-outer="copyText(accountData.walletAddress)"
            />
            <p class="mb-0">
              {{ accountData.description }}
            </p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <AccountCreateDialog
      ref="accountCreateDialog"
      @createAccount="createAccount"
      @cancel="router.push('/')"
    />
    <TheSnackbar
      ref="theSnackbar"
      color="success"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, useAsync, useRouter } from '@nuxtjs/composition-api'
import useAccount from '~/composable/useAccount'
import useWallet from '~/composable/useWallet'
import { Account } from '~/types/index'

export default defineComponent({
  name: 'AccountProfilePage',

  components: {
    AccountCreateDialog: () => import('~/components/molecules/dialogs/AccountCreateDialog.vue'),
    AvatarImage: () => import('~/components/atoms/AvatarImage.vue'),
    BannerImage: () => import('~/components/atoms/BannerImage.vue'),
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
      walletAddress: wallet.getWalletAddress(),
      username: '',
      profileImageUri: '',
      profileBannerUri: '',
      description: '',
    })

    /** Acount create dialog */
    const accountCreateDialog = ref<any>(null)

    /** The snackbar */
    const theSnackbar = ref<any>()

    /**
     * openAccountCreateDialog
     */
    const openAccountCreateDialog = () => {
      const refs: any = accountCreateDialog.value
      refs.open()
    }

    /**
     * closeAccountCreateDialog
     */
    const closeAccountCreateDialog = () => {
      const refs: any = accountCreateDialog.value
      refs.close()
    }

    /**
     * createAccount
     */
    const createAccount = () => {
      const walletAddress: string = wallet.getWalletAddress()
      const data: any = account.create(walletAddress)
      // TODO: レスポンスを整える
      console.log('data: ', data)

      closeAccountCreateDialog()
      theSnackbar.value.open('アカウント登録に成功しました。')
    }

    /**
     * getAccount
     */
    const getAccount = useAsync(async () => {
      // アカウント情報を取得
      const { data }: any = await account.findOne({
        walletAddress: {
          eq: wallet.getWalletAddress()
        }
      })

      // アカウント情報が存在しない場合は会員登録
      if (data === null) {
        console.log('データが存在しませんでした。')
        openAccountCreateDialog()
      }
      /*
      accountData.value = {
        walletAddress: wallet.getWalletAddress(),
        username: '',
        profileImageUri: '',
        profileBannerUri: '',
        description: '',
      }
      */
    })

    /**
     * copyText
     */
    const copyText = (walletAddress: string) => {
      navigator.clipboard.writeText(walletAddress)
      theSnackbar.value.open('コピーしました。')
    }

    return {
      router,
      accountData,
      accountCreateDialog,
      theSnackbar,
      openAccountCreateDialog,
      createAccount,
      getAccount,
      copyText,
    }
  },
})
</script>

