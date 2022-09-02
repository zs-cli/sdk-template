import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/styles/index.less'
import App from './App'
import store from './store'
import router from './router'
import moment from 'moment'
// 指令
import '@/directives/vPermission'

import '@/permission'
import '@/adaptation'

if (process.env.NODE_ENV === 'development') {
  const { mockXHR } = require('../mock')
  mockXHR()
}
// prototype
Vue.prototype.$moment = moment
// use
Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
})
