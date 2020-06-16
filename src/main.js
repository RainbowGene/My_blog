import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element'
// 引入全局样式表
import './assets/css/global.css'
// 引入首页的样式表
import './assets/style.css' // 这个样式表对后台管理造成了污染
// 引入字体图标
import './assets/fonts/iconfont.css'
// bootstrap
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.css'
import api from './api/api'

Vue.prototype.$api = api

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
