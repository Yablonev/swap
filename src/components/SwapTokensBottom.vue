<template>
  <div class="grid">
    <div class="grid_box">
      <div class="row">
        <div class="left">
          <div class="title">Minimum received</div>
          <span>
            <div class="question" content="Your transaction will revert if there is a large, unfavorable price movement before it is confirmed." v-tippy>
              <div class="question_icon">
                <svg><use xlink:href="#icon-question"></use></svg>
              </div>
            </div>
          </span>
        </div>
        <div class="left">
          <div class="value">{{ minimumReceived }} {{ swapTokens.out.token }}</div>
        </div>
      </div>
      <div class="row">
        <div class="left">
          <div class="title">Price Impact</div>
          <span>
            <div class="question" content="The difference between the market price and estimated price due to trade size." v-tippy>
              <div class="question_icon">
                <svg><use xlink:href="#icon-question"></use></svg>
              </div>
            </div>
          </span>
        </div>
        <div :class="getPriceImpactColor">{{ priceImpact }}%</div>
      </div>
      <div class="row">
        <div class="left">
          <div class="title">Liquidity Provider Fee</div>
          <span>
            <div class="question" content="A portion of each trade (0.30%) goes to liquidity providers as a protocol incentive." v-tippy>
              <div class="question_icon">
                <svg><use xlink:href="#icon-question"></use></svg>
              </div>
            </div>
          </span>
        </div>
        <div class="value">{{ liquidityProviderFee }} {{ swapTokens.in.token }}</div>
      </div>
    </div>
    <template v-if="routeTokens.length > 2">
      <hr />
      <div class="swap-route">
        <div class="left">
          <div class="title">Route</div>
          <span>
            <div class="question" content="Routing through these tokens resulted in the best price for your trade." v-tippy>
              <div class="question_icon">
                <svg><use xlink:href="#icon-question"></use></svg>
              </div>
            </div>
          </span>
        </div>
        <div class="routes">
          <template v-for="(token, i) of routeTokens">
            <div class="route" :key="token">
              <img :alt="`${token} logo`" :src="require(`@/assets/images/tokens/${token}.png`)" />
              <div class="title">{{ token }}</div>
            </div>
            <svg v-if="i+1 < routeTokens.length" :key="i"><use xlink:href="#icon-arrow-right"></use></svg>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'SwapTokensBottom',
  props: ['routeTokens', 'priceImpact', 'minimumReceived', 'liquidityProviderFee'],
  computed: {
    getPriceImpactColor() {
      if (this.priceImpact < 1) return 'success'
      if (this.priceImpact < 3) return 'white'
      if (this.priceImpact < 5) return 'warning'
      return 'danger'
    },
    swapTokens() {
      return this.$store.getters['get_swapTokens']
    },
    tokensList() {
      return this.$store.getters['get_tokensList']
    },
  },
}
</script>

<style lang="sass" scoped>
@import '@/assets/sass/components/swap_bottom'
</style>