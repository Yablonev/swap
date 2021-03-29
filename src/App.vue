<template>
  <main class="main">
    <LightningIcon position="left" />
    <SwapTokens />
    <LightningIcon position="right" />
    <SelectToken v-if="modal === 'select_token'" />
    <ConnectWallet v-if="modal === 'connect_wallet'" />
    <SvgIcons />
  </main>
</template>

<script>
import SwapTokens from '@/components/SwapTokens'
import LightningIcon from '@/components/LightningIcon'
import SvgIcons from '@/components/SvgIcons'

/* Modals */
import SelectToken from '@/components/modals/SelectToken'
import ConnectWallet from '@/components/modals/ConnectWallet'

export default {
  name: 'App',
  components: {
    SwapTokens, LightningIcon, SvgIcons, ConnectWallet, SelectToken
  },
  computed: {
    modal() {
      return this.$store.getters['get_modal']
    }
  },
}
</script>

<style lang="sass">
@import '@/assets/sass/style'
</style>