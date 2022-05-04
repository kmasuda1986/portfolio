<template>
  <v-app dark>
    <v-app-bar app>
      <v-spacer />
      <v-btn
        color="light-blue"
        outlined
        @click="openWalletConnectDialog"
      >
        connect
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
import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'
import useWallet from '~/composable/useWallet'

export default defineComponent({
  name: 'DefaultLayout',

  components: {
    TheSnackbar: () => import('~/components/atoms/TheSnackbar.vue'),
    WalletConnectDialog: () => import('~/components/molecules/dialogs/WalletConnectDialog.vue')
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

    /** The snackbar */
    const theSnackbar = ref<any>(null)

    /** The snackbar color */
    const theSnackbarColor = ref<string>('')

    /** Wallet connect dialog */
    const walletConnectDialog = ref<any>(null)

    /**
     * openWalletConnectDialog
     */
    const openWalletConnectDialog = () => {
      const refs: any = walletConnectDialog.value
      refs.open()
    }

    /**
     * connectWallet
     */
    const connectWallet = async () => {
      try {
        const win: any = window

        // Metamaskがインストールされていない場合はエラー
        if (!wallet.isEthereum()) {
          throw new TypeError('Metamaskが見つかりませんでした。')
        }

        // 接続先が正しい場合はtrue
        const isChainId = await wallet.isChainId(chainId)
        if (!isChainId) {
          const res: any = await wallet.switchEthereumChain(chainId)

          if (res.status === 'error') {
            if (res.code === 4902) {
              console.log('接続先を追加')
              await wallet.addEthereumChain(chainId, chainName, currencySymbol, rpcUrls, blockExplorerUrl)
            } else {
              throw new Error(res.data.message)
            }
          }
        }
        /**
        const chainId = await win.ethereum.request({ method: 'eth_chainId' })
        if (chainId !== $config.chainId) {
          console.log('接続先が違う')
          const test = await win.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: `0x${$config.chainId.toString(16)}` }]
          })

          console.log('test: ', test)
        }
        */

        // ウォレット接続処理
        /*
        const res: any = await win.ethereum.request({ method: 'eth_requestAccounts' })
          .then((accounts: [String]) => {
            return {
              status: 'success',
              data: {
                account: accounts[0]
              }
            }
          })
          .catch((result: any) => {
            return {
              status: 'error',
              data: {
                message: result.code === 4001 ? '接続がキャンセルされました。' : '接続エラーが発生しました。'
              }
            }
          })

        // 接続エラーの場合は処理終了
        if (res.status === 'error') {
          throw new Error(res.data.message)
        }
        */

        // ネットワークが変更された場合はリロード
        win.ethereum.on('chainChanged', () => {
          window.location.reload();
        })

        // ウォレットが切断された場合はリロード
        win.ethereum.on('disconnect', () => {
          window.location.reload();
        })

        theSnackbarColor.value = 'success'
        theSnackbar.value.open('接続に成功しました。')
      } catch (error: any) {
        theSnackbarColor.value = 'error'
        theSnackbar.value.open(error.message)
      }
    }

    return {
      theSnackbar,
      theSnackbarColor,
      walletConnectDialog,
      openWalletConnectDialog,
      connectWallet
    }
  },
})
</script>
