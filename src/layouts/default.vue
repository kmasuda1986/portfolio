<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      app
      right
      temporary
    >
      <v-list>
        <v-list-item
          @click="drawer = !drawer"
        >
          <v-list-item-action>
            <v-icon>mdi-close</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'Close'" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item @click="openWalletInfoDialog">
          <v-list-item-action>
            <v-icon v-text="'mdi-wallet-outline'" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="'My wallet'" />
          </v-list-item-content>
        </v-list-item>

        <v-list-group
          prepend-icon="mdi-account-outline"
          no-action
        >
          <template #activator>
            <v-list-item-title>Account</v-list-item-title>
          </template>
          <v-list-item link to="/account/profile">
            <v-list-item-title v-text="'Profile'" />
            <v-list-item-action>
              <v-btn icon>
                <v-icon v-text="'mdi-account-outline'" />
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-group>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title v-text="'追加機能開発中...'" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <WalletInfoDialog
      ref="walletInfoDialog"
      :wallet-address="walletAddress"
    />
    <v-app-bar app>
      <v-spacer />
      <v-app-bar-nav-icon
        v-if="walletAddress"
        @click="drawer = !drawer"
      />
      <v-btn
        v-else
        color="light-blue"
        outlined
        @click="openWalletConnectDialog"
      >
        connect
        <v-icon right>
          mdi-wallet
        </v-icon>
      </v-btn>
      <WalletConnectDialog
        ref="walletConnectDialog"
        @connectWallet="connectWallet"
      />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <TheSnackbar
      ref="theSnackbar"
      :color="theSnackbarColor"
    />
    <v-footer
      dark
      padless
    >
      <v-card
        class="flex text-center"
        flat
        tile
      >
        <v-card-text class="white--text">
          © {{ new Date().getFullYear() }} Kentaro Masuda.
        </v-card-text>
      </v-card>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, useContext } from '@nuxtjs/composition-api'
import useWallet from '~/composable/useWallet'

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
    WalletConnectDialog: () => import('~/components/molecules/dialogs/WalletConnectDialog.vue'),
    WalletInfoDialog: () => import('~/components/molecules/dialogs/WalletInfoDialog.vue')
  },

  setup() {
    /** Context */
    const { $config } = useContext()

    /** Chain ID */
    const chainId = `0x${$config.chainId.toString(16)}`

    /** chainName */
    const chainName = $config.chianName

    /** currencySymbol */
    const currencySymbol = $config.currencySymbol

    /** rpcUrls */
    const rpcUrls = $config.rpcUrl

    /** blockExplorerUrl */
    const blockExplorerUrl = $config.blockExplorerUrl

    /** Use wallet */
    const wallet = useWallet()

    /** Drawer */
    const drawer = ref(false)

    /** Wallet address */
    const walletAddress = ref<string>('')

    /** The snackbar */
    const theSnackbar = ref<any>(null)

    /** The snackbar color */
    const theSnackbarColor = ref<string>('')

    /** Wallet connect dialog */
    const walletConnectDialog = ref<any>(null)

    /** Wallet infomation dialog */
    const walletInfoDialog = ref<any>(null)

    /**
     * onMounted
     */
    onMounted(() => {})

    /**
     * openWalletConnectDialog
     */
    const openWalletConnectDialog = () => {
      const refs: any = walletConnectDialog.value
      refs.open()
    }

    /**
     * closeWalletConnectDialog
     */
    const closeWalletConnectDialog = () => {
      const refs: any = walletConnectDialog.value
      refs.close()
    }

    /**
     * openWalletInfoDialog
     */
    const openWalletInfoDialog = () => {
      drawer.value = false
      const refs: any = walletInfoDialog.value
      refs.open()
    }

    /**
     * connectWallet
     *
     * @returns Promise<any>
     */
    const connectWallet = async (): Promise<any> => {
      try {
        const win: any = window

        // Metamaskがインストールされていない場合はエラー
        if (!wallet.isEthereum()) {
          throw new TypeError('Metamaskが見つかりませんでした。')
        }

        // 接続先をチェック
        const isChainId = await wallet.isChainId(chainId)
        if (!isChainId) {
          // 接続先が相違する場合はスイッチ
          await switchEthereumChain()

          // もう一度接続先をチェック
          if (! await wallet.isChainId(chainId)) {
            throw new TypeError('接続がキャンセルされました。')
          }
        }

        // ウォレットに接続
        const account = await requestAccounts()

        // Storeにウォレットアドレスを保存
        wallet.setWalletAddress(account)
        walletAddress.value = wallet.getWalletAddress()

        // ネットワークが変更された場合はリロード
        win.ethereum.on('chainChanged', () => {
          window.location.reload();
        })

        // ウォレットが切断された場合はリロード
        win.ethereum.on('disconnect', () => {
          window.location.reload();
        })

        closeWalletConnectDialog()

        theSnackbarColor.value = 'success'
        theSnackbar.value.open('接続に成功しました。')
      } catch (error: any) {
        theSnackbarColor.value = 'error'
        theSnackbar.value.open(error.message)
      }
    }

    /**
     * switchEthereumChain
     *
     * @returns Promise<any>
     */
    const switchEthereumChain = async (): Promise<any> => {
      const res: any = await wallet.switchEthereumChain(chainId)
      if (res.status === 'error') {
        if (res.data.code === 4902) {
          await addEthereumChain()
        } else {
          throw new Error(res.data.message)
        }
      }
    }

    /**
     * addEthereumChain
     *
     * @returns Promise<any>
     */
    const addEthereumChain = async (): Promise<any> => {
      const res: any = await wallet.addEthereumChain(chainId, chainName, currencySymbol, rpcUrls, blockExplorerUrl)

      if (res.status === 'error') {
        throw new Error(res.data.message)
      }
    }

    /**
     * requestAccounts
     *
     * @returns Promise<string>
     */
    const requestAccounts = async (): Promise<string> => {
      const res: any = await wallet.requestAccounts()

      if (res.status === 'error') {
        throw new Error(res.data.message)
      }

      return res.data.account
    }

    return {
      drawer,
      walletAddress,
      theSnackbar,
      theSnackbarColor,
      walletConnectDialog,
      walletInfoDialog,
      openWalletConnectDialog,
      closeWalletConnectDialog,
      openWalletInfoDialog,
      connectWallet,
      switchEthereumChain,
      addEthereumChain,
      requestAccounts,
    }
  },
})
</script>
