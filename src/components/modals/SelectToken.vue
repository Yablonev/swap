<template>
  <ModalWindow title="Select a token" v-on:close="$store.commit('closeModal')">
    <input ref="q" v-model="query_token" placeholder="Search name or paste address" />
    <div class="row">
      <h4>Token Name</h4>
      <button @click="reverseTokensList">
        <span>{{ !reversed ? '↓' : '↑' }}</span>
      </button>
    </div>
    <hr />
    <ul>
      <li :disabled="isDisabled('G$')" @click="selectToken('G$')">
        <img src="@/assets/images/tokens/G$.png" alt="G$" />
        <p title="GoodDollar">G$</p>
      </li>
      <li v-for="token of filteredTokens" :key="token" :disabled="isDisabled(token)" @click="selectToken(token)">
        <img :src="require(`@/assets/images/tokens/${token}.png`)" :alt="token" />
        <p :title="getTitleByToken(token)">{{ token }}</p>
      </li>
    </ul>
  </ModalWindow>
</template>

<script>
import ModalWindow from '@/components/ModalWindow'

export default {
  name: 'SelectToken',
  components: { ModalWindow },
  data() {
    return {
      query_token: '',
      reversed: false
    }
  },
  computed: {
    selectType() {
      return this.$store.getters['get_selectType']
    },
    swapTokens() {
      return this.$store.getters['get_swapTokens']
    },
    tokensList() {
      return this.$store.getters['get_tokensList']
    },
    filteredTokens() {
      return this.tokensList.filter(token => token.toLowerCase().includes(this.query_token.toLowerCase()) && token !== 'G$')
    }
  },
  methods: {
    getTitleByToken(token) {
      const tokensTitles = {
        FUSE: 'Fuse',
        DAI: 'Dai Stablecoin on Fuse',
        fUSD: 'Fuse Dollar',
        G$: 'GoodDollar',
        GRT: 'Graph Token on Fuse',
        KNC: 'Kyber Network Crystal on Fuse',
        LINK: 'ChainLink Token on Fuse',
        OM: 'MANTRA DAO on Fuse',
        USDC: 'USD Coin on Fuse',
        USDT: 'Tether USD on Fuse',
        WBTC: 'Wrapped BTC on Fuse',
        WETH: 'Wrapped Ether on Fuse',
        WFUSE: 'Wrapped Fuse'
      }

      return tokensTitles[token]
    },
    reverseTokensList() {
      this.reversed = !this.reversed
      this.$store.commit('reverse_tokensList')
    },
    isDisabled(token) {
      return token === this.swapTokens.in.token || token === this.swapTokens.out.token
    },
    selectToken(token) {
      if (this.isDisabled(token)) return
      this.$store.commit('select_swapToken_'+this.selectType, token)
      this.$store.commit('closeModal')
    }
  },
  mounted() {
    this.$refs.q.focus()
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/components/modals/select_token'
</style>