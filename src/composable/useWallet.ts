import { useStore } from '@nuxtjs/composition-api'

type Response = {
  status: String
  data: {}
}

type AddEthereumChainParameter = {
  chainId: string; // A 0x-prefixed hexadecimal string
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string; // 2-6 characters long
    decimals: 18;
  };
  rpcUrls: string[];
  blockExplorerUrls?: string[];
  iconUrls?: string[]; // Currently ignored.
}

export default function useWallet() {
  /** Window */
  const w: any = window

  /** Use store */
  const store = useStore()

  /**
   * getWalletAddress
   *
   * @returns string
   */
  const getWalletAddress = () => {
    return store.getters.getWalletAddress
  }

  /**
   * setWalletAddress
   *
   * @param walletAddress string
   */
  const setWalletAddress = (walletAddress: string) => {
    store.dispatch('setWalletAddress', walletAddress)
  }

  /**
   * isEthereum
   *
   * @returns boolean
   */
  const isEthereum = (): boolean => {
    return typeof w.ethereum !== 'undefined'
  }

  /**
   * isChainId
   *
   * @param chainId string
   * @returns Promise<string>
   */
  const isChainId = async (chainId: string): Promise<boolean> => {
    const connectChainId = await w.ethereum.request({ method: 'eth_chainId' })

    return connectChainId === chainId
  }

  /**
   * switchEthereumChain
   *
   * @param chainId string
   * @returns Response
   */
  const switchEthereumChain = async (chainId: string): Promise<Response> => {
    try {
      await w.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }]
      })

      return {
        status: 'success',
        data: {}
      }
    } catch(error: any) {
      if (error.code === 4001) {
        return {
          status: 'error',
          data: {
            code: 4001,
            message: '接続がキャンセルされました。',
          }
        }
      } else if (error.code === 4902) {
        return {
          status: 'error',
          data: {
            code: 4902,
            message: 'ネットワークが登録されていませんでした。',
          }
        }
      } else {
        return {
          status: 'error',
          data: {
            code: 9999,
            message: '接続エラーが発生しました。',
          }
        }
      }
    }
  }

  /**
   * addEthereumChain
   *
   * @param chainId 
   * @param chainName 
   * @param currencySymbol 
   * @param rpcUrl 
   * @param blockExplorerUrl 
   * @returns Promise<Response>
   */
  const addEthereumChain = async (
    chainId: string,
    chainName: string,
    currencySymbol: string,
    rpcUrl: string,
    blockExplorerUrl: string
  ): Promise<Response> => {
    try {
      const params = {
        chainId,
        chainName,
        nativeCurrency: {
          symbol: currencySymbol,
          decimals: 18,
        },
        rpcUrls: [rpcUrl],
        blockExplorerUrls: [blockExplorerUrl],
      } as AddEthereumChainParameter

      await w.ethereum.request({
        method: 'wallet_addEthereumChain',
        params: [ params ],
      })

      return {
        status: 'success',
        data: {}
      }
    } catch (error: any) {
      if (error.code === 4001) {
        return {
          status: 'error',
          data: {
            code: 4001,
            message: '接続がキャンセルされました。',
          }
        }
      } else {
        return {
          status: 'error',
          data: {
            code: 9999,
            message: '接続エラーが発生しました。',
          }
        }
      }
    }
  }

  /**
   * requestAccounts
   *
   * @returns Promise<Response>
   */
  const requestAccounts = async (): Promise<Response> => {
    try {
      const accounts = await w.ethereum.request({
        method: 'eth_requestAccounts',
      })
      
      return {
        status: 'success',
        data: {
          account: accounts[0]
        }
      }
    } catch (error: any) {
      if (error.code === 4001) {
        return {
          status: 'error',
          data: {
            code: 4001,
            message: '接続がキャンセルされました。',
          }
        }
      } else {
        return {
          status: 'error',
          data: {
            code: 9999,
            message: '接続エラーが発生しました。',
          }
        }
      }
    }
  }

  return {
    getWalletAddress,
    setWalletAddress,
    isEthereum,
    isChainId,
    switchEthereumChain,
    addEthereumChain,
    requestAccounts,
  }
}
