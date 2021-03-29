import store from '@/store'

function currentRateReversed() {
  return formatAmount(1 / currentRate())
}

function currentRate() {
  let rate_data = store.getters['get_rates'].find(rate => isMatchRate(rate, 1) || isMatchRate(rate, 2))
  return rate_data ? rate_data['price'] : null
}

function isMatchRate(rate, type) {
  if (type === 1) return rate.in === store.getters['get_swapTokens'].in.token && rate.out === store.getters['get_swapTokens'].out.token
  if (type === 2) return rate.in === store.getters['get_swapTokens'].out.token && rate.out === store.getters['get_swapTokens'].in.token
}

function formatAmount(payload) {
  if (payload === Infinity) return null
  if (!payload.toString().includes('.')) return payload
  return payload.toString().split('.')[1].length > 3 ? payload.toFixed(3) : payload
}

export { currentRateReversed, currentRate, isMatchRate, formatAmount }