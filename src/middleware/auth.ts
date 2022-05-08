export default function ({ store, redirect }: any) {
  const walletAddress = store.getters.getWalletAddress
  if (!walletAddress) {
    return redirect('/')
  }
}
