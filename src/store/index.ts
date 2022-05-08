type walletAddress = string

type State = {
  walletAddress: walletAddress
}

export const state = () => ({
  walletAddress: '',
})

export const mutations = {
  setWalletAddress(state: State, walletAddress: walletAddress) {
    state.walletAddress = walletAddress
  },
}

export const actions = {
  async setWalletAddress({ commit }: any, walletAddress: walletAddress) {
    await commit('setWalletAddress', walletAddress)
  },
}

export const getters = {
  getWalletAddress(state: State) {
    return state.walletAddress
  },
}
