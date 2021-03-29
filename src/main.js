import Vue from 'vue'
import store from '@/store.js'
import App from '@/App.vue'
import VueAnimated from '@codekraft-studio/vue-animated'

import VueTippy, { TippyComponent } from 'vue-tippy'

Vue.config.productionTip = false

Vue.use(VueAnimated, {
  defaultDuration: 750,
  functional: true
})

Vue.use(VueTippy, { placement : 'right',  arrow: true })
Vue.component('tippy', TippyComponent)

new Vue({
  render: h => h(App),
  store
}).$mount('#app')