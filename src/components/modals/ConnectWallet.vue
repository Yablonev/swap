<template>
  <ModalWindow title="Connect to a wallet" v-on:close="$store.commit('closeModal')">
    <div class="connect-wallet">
      <div class="connect-wallet__top">
        <button ref="MetaMask">
          <div class="text">
            <p>MetaMask</p>
          </div>
          <div class="right">
            <img src="@/assets/images/misc/metamask.png" alt="MetaMask" />
          </div>
        </button>
        <button>
          <div class="text">
            <p>Coinbase Wallet</p>
          </div>
          <div class="right">
            <img src="@/assets/images/misc/coinbaseWalletIcon.svg" alt="Coinbase Wallet">
          </div>
        </button>
      </div>
      <div class="connect-wallet__bottom">
        <span>New to Ethereum?</span>
        <a target="_blank" rel="noopener noreferrer" href="https://ethereum.org/wallets/">Learn more about wallets</a>
      </div>
    </div>
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow'

export default {
  name: 'ConnectWallet',
  components: { ModalWindow },
  mounted() {
    this.$refs.MetaMask.focus()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/components/modals/connect_wallet'
</style>