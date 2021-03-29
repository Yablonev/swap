import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import rates from '@/rates'

import { formatAmount, currentRate, currentRateReversed } from '@/helper'

export default new Vuex.Store({
  state: {
    modal: '',
    selectType: '',
    tokensList: ['G$', 'DAI', 'fUSD', 'FUSE', 'GRT', 'KNC', 'LINK', 'OM', 'USDC', 'USDT', 'WBTC', 'WETH', 'WFUSE'],
    swapTokens: {
      in: {
        token: 'G$',
        amount: 0,
      },
      out: {
        token: '',
        amount: 0
      }
    },
    swapDirection: null,
    rates
  },
  mutations: {
    closeModal(state) {
      state.modal = ''
    },
    showModal(state, payload) {
      state.modal = payload
    },
    reverse_tokensList(state) {
      state.tokensList = state.tokensList.reverse()
    },
    inverse_swapTokens(state) {
      state.swapTokens = { in: state.swapTokens.out, out: state.swapTokens.in }
      if (state.swapDirection === 'in') state.swapDirection = 'out'
      else if (state.swapDirection) state.swapDirection = 'in'
    },
    set_selectType(state, payload) {
      state.selectType = payload
    },
    select_swapToken_in(state, token) {
      state.swapTokens = { out: state.swapTokens.out, in: { amount: state.swapTokens.in.amount, token } }
      let amount = formatAmount(state.swapTokens.out.amount * currentRate())
      if (!amount) return
      state.swapTokens = { out: { token: state.swapTokens.out.token, amount }, in: state.swapTokens.in }
    },
    select_swapToken_out(state, token) {
      state.swapTokens = { in: state.swapTokens.in, out: { amount: state.swapTokens.out.amount, token } }
      let amount = formatAmount(state.swapTokens.in.amount * currentRateReversed())
      if (!amount) return
      state.swapTokens = { in: { token: state.swapTokens.in.token, amount }, out: state.swapTokens.out }
    },
    set_swapTokenAmount_in(state, amount) {
      if (Number.isNaN(amount) || amount == 0) amount = null
      state.swapTokens = { out: state.swapTokens.out, in: { token: state.swapTokens.in.token, amount } }
    },
    set_swapTokenAmount_out(state, amount) {
      if (Number.isNaN(amount) || amount == 0) amount = null
      state.swapTokens = { in: state.swapTokens.in, out: { token: state.swapTokens.out.token, amount } }
    },
    set_swapDirection(state, payload) {
      state.swapDirection = payload
    },
    reset_swapTokensAmount(state) {
      state.swapTokens = { in: { token: state.swapTokens.in.token, amount: null }, out: { token: state.swapTokens.out.token, amount: null } }
    }
  },
  getters: {
    get_modal: state => state.modal,
    get_tokensList: state => state.tokensList,
    get_swapTokens: state => state.swapTokens,
    get_selectType: state => state.selectType,
    get_rates: state => state.rates,
    get_swapDirection: state => state.swapDirection,
  }
})