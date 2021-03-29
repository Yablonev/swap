<template>
  <section class="swap-tokens">
    <div class="swap-window">
      <div class="swap-window__title">
        <a class="swap-window__title-text active">Swap</a>
        <a class="swap-window__title-text" disabled>Pool</a>
        <a class="swap-window__title-text" disabled>Bridge</a>
      </div>
      <div class="swap-window__box">
        <div class="swap-window__box-content">
          <div class="swap-window__box-input">
            <div>
              <div class="swap-window__box-input-label">
                <div><label for="token-amount-input">{{ labelText('From') }}</label></div>
              </div>
              <div class="swap-window__box-input-value">
                <input
                  id="token-amount-input"
                  @focus="$store.commit('set_swapDirection', 'in')"
                  title="Token Amount"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="text"
                  placeholder="0.0"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  v-model="in_amount"
                />
                <button :class="{ 'select-token': !swapTokens.in.token }" @click="showModal('select_token', 'in')">
                  <span>
                    <img v-if="swapTokens.in.token" :alt="`${swapTokens.in.token} logo`" :src="require(`@/assets/images/tokens/${swapTokens.in.token}.png`)" />
                    <span :class="{ 'with-token': swapTokens.in.token, 'without-token': !swapTokens.in.token }">{{ swapTokens.in.token ? swapTokens.in.token : 'Select token' }}</span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M0.97168 1L6.20532 6L11.439 1" stroke="rgb(255, 255, 255)" stroke-width="1.5px"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div class="swap-window__box-inverse">
            <span>
              <button
                @focus="inverse_focus = true"
                @blur="inverse_focus = false"
                @mouseenter="inverse_focus = true"
                @mouseleave="inverse_focus = false"
                @click="inverse"
                ref="inverse"
              >
                <svg><use :xlink:href="`#icon-inverse-arrow${inverse_focus ? '-hover' : ''}`"></use></svg>
              </button>
            </span>
          </div>
          <div class="swap-window__box-input">
            <div>
              <div class="swap-window__box-input-label">
                <div><label for="token-amount-output">{{ labelText('To') }}</label></div>
              </div>
              <div class="swap-window__box-input-value">
                <input
                  id="token-amount-output"
                  @focus="$store.commit('set_swapDirection', 'out')"
                  title="Token Amount"
                  inputmode="decimal"
                  autocomplete="off"
                  autocorrect="off"
                  type="text"
                  placeholder="0.0"
                  step="0.1"
                  minlength="1"
                  maxlength="79"
                  spellcheck="false"
                  v-model="out_amount"
                />
                <button :class="{ 'select-token': !swapTokens.out.token }" @click="showModal('select_token', 'out')">
                  <span>
                    <img v-if="swapTokens.out.token" :alt="`${swapTokens.out.token} logo`" :src="require(`@/assets/images/tokens/${swapTokens.out.token}.png`)" />
                    <span :class="{ 'with-token': swapTokens.out.token, 'without-token': !swapTokens.out.token }">
                      {{ swapTokens.out.token ? swapTokens.out.token : 'Select token' }}
                    </span>
                    <svg width="12" height="7" viewBox="0 0 12 7" fill="none">
                      <path d="M0.97168 1L6.20532 6L11.439 1" stroke="rgb(255, 255, 255)" stroke-width="1.5px"></path>
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="swap__window-bottom">
          <div v-show="showPrice">
            <div class="row">
              <p class="price">Price</p>
              <div>
                <p class="price_num" v-if="!inverse_price">{{ currentRate }} {{ swapTokens.in.token }} per {{ swapTokens.out.token }}</p>
                <p class="price_num" v-else>{{ currentRateReversed }} {{ swapTokens.out.token }} per {{ swapTokens.in.token }}</p>
                <button @click="inverse_price = !inverse_price">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
                </button>
              </div>
            </div>
          </div>
          <button @click="showModal('connect_wallet')" class="connect__wallet">Connect Wallet</button>
        </div>
      </div>
    </div>
    <div class="swap-bottom-window" :class="{ show: showPrice }">
      <SwapTokensBottom :routeTokens="routeTokens" :priceImpact="priceImpact" :liquidityProviderFee="liquidityProviderFee" :minimumReceived="minimumReceived" v-if="showPrice"/>
    </div>
  </section>
</template>

<script>
import SwapTokensBottom from '@/components/SwapTokensBottom'

export default {
  name: 'SwapTokens',
  components: { SwapTokensBottom },
  data() {
    return {
      inverse_price: false,
      inverse_focus: false,
      in_amount: null,
      out_amount: null,
      priceImpact: 0,
      routeTokens: []
    }
  },
  computed: {
    tokensList() {
      return this.$store.getters['get_tokensList']
    },
    swapTokens() {
      return this.$store.getters['get_swapTokens']
    },
    currentRate() {
      let rate_data = this.$store.getters['get_rates'].find(rate => this.isMatchRate(rate, 1) || this.isMatchRate(rate, 2))
      return rate_data ? rate_data['price'] : null
    },
    showPrice() {
      return this.currentRate && this.swapTokens.in.amount > 0
    },
    currentRateReversed() {
      return this.formatAmount(1 / this.currentRate)
    },
    minimumReceived() {
      return this.formatAmount(this.swapTokens.out.amount - this.liquidityProviderFee)
    },
    liquidityProviderFee() {
      if (!this.swapTokens.in.amount) return 0
      let fee = this.swapTokens.in.amount * .003
      return this.formatAmount(fee)
    },
    isRateSet() {
      return this.swapTokens.in.token && this.swapTokens.out.token
    },
    swapTokensInToken() {
      return this.swapTokens.in.token 
    },
    swapTokensOutToken() {
      return this.swapTokens.out.token 
    }
  },
  watch: {
    in_amount(payload) {
      if (!this.formatInput(payload, 'in')) return
      if (Number.isNaN(+payload)) return
      this.swapInput(payload, 'in')
      this.$store.commit('set_swapTokenAmount_in', parseFloat(payload))
      if (!this.isRateSet && this.$store.getters['get_swapDirection'] === 'in') this.$store.commit('set_swapTokenAmount_out', null)
      if (this.$store.getters['get_swapDirection'] === 'out' || !this.isRateSet) return
      this.out_amount = this.formatAmount(+payload * this.currentRateReversed)
    },
    out_amount(payload) {
      if (!this.formatInput(payload, 'out')) return
      if (Number.isNaN(+payload)) return
      this.swapInput(payload, 'out')
      this.$store.commit('set_swapTokenAmount_out', +payload)
      if (!this.isRateSet && this.$store.getters['get_swapDirection'] === 'out') this.$store.commit('set_swapTokenAmount_in', null)
      if (this.$store.getters['get_swapDirection'] === 'in' || !this.isRateSet) return
      this.in_amount = this.formatAmount(+payload * this.currentRate)
    },
    swapTokens(payload) {
      this.in_amount = payload.in.amount
      this.out_amount = payload.out.amount
    },
    swapTokensInToken() {
      this.route = this.newRouteTokens()
    },
    swapTokensOutToken() {
      this.route = this.newRouteTokens()
    },
  },
  methods: {
    labelText(text) {
      let type = text === 'To' ? 'in' : 'out'
      return (this.swapTokens[type].amount > 0 && this.$store.getters['get_swapDirection'] === type && this.isRateSet) ? `${text} (estimated)` : text
    },
    formatInput(payload, type) {
      if (this.isRateSet && ((type === 'in' && !payload) || (type === 'out' && !payload))) this.$store.commit('reset_swapTokensAmount')
      if (this.$store.getters['get_swapDirection'] === type && typeof payload === 'string') {
        let digits = new Array(10).fill(0).map((ii, iii) => ''+(ii+iii))
        let last_input = payload[payload.length-1]
        if (!digits.includes(last_input)) {
          if (last_input === '.' && !payload.slice(0, -1).includes('.')) return false
          if (last_input === ',') {
            payload = payload.replace(',', '.')
            if (type === 'in') this.in_amount = payload
            if (type === 'out') this.out_amount = payload
            return false
          }
          payload = payload.slice(0, -1)
          if (type === 'in') this.in_amount = payload
          if (type === 'out') this.out_amount = payload
          return false
        }
        return true
      }
      return true
    },
    formatAmount(payload) {
      if (payload === Infinity) return null
      if (!payload.toString().includes('.')) return payload
      return payload.toString().split('.')[1].length > 3 ? payload.toFixed(3) : payload
    },
    swapInput(payload, type) {
      payload = String(payload)
      if (!payload.length && type !== this.$store.getters['swapDirection']) return
      let mock_nums = [0.27, 2.89, 4.65, 32.74, 82.84, 99.7]
      let m = mock_nums[payload.length-1]
      if (!m && !payload.length) return
      this.priceImpact = m > 0 ? m : mock_nums[mock_nums.length-1]
    },
    isMatchRate(rate, type) {
      if (type === 1) return rate.in === this.swapTokens.in.token && rate.out === this.swapTokens.out.token
      if (type === 2) return rate.in === this.swapTokens.out.token && rate.out === this.swapTokens.in.token
    },
    async inverse() {
      let temp_routeTokens = this.routeTokens
      if (this.$store.getters['swapDirection'] === 'in') this.in_amount = this.swapTokens.out.amount
      if (this.$store.getters['swapDirection'] === 'out') this.out_amount = this.swapTokens.in.amount
      this.inverse_price = !this.inverse_price
      this.$store.commit('inverse_swapTokens')
      await this.$nextTick()
      this.routeTokens = this.newRouteTokens(temp_routeTokens)
    },
    showModal(payload, type = null) {
      if (type) this.$store.commit('set_selectType', type)
      this.$store.commit('showModal', payload)
    },
    newRouteTokens(inverse = false) {
      if (!inverse) {
        let r = this.randomNumber(0, 2)
        if (r === 0) return this.routeTokens = []
        this.routeTokens = [this.swapTokens.in.token, ...this.randomRouteTokens(r), this.swapTokens.out.token]
      } else {
        inverse.shift()
        inverse.pop()
        return [this.swapTokens.in.token, ...inverse, this.swapTokens.out.token]
      }
    },
    randomRouteTokens(r) {
      return this.shuffle(this.tokensList.filter(token => token !== this.swapTokens.in.token && token !== this.swapTokens.out.token)).slice(0, r)
    },
    randomNumber(min, max) {
      return Math.floor(Math.random() * (max - min + 1) ) + min
    },
    shuffle(a) {
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]]
      }
      return a
    },
  }
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/components/swap'
</style>