import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import Vuex from 'vuex'
import store from '@/store/store.js'

Vue.use(Vuex);

Vue.config.productionTip = false
import { Lazyload } from 'vant';
Vue.use(Lazyload);

// 注册时可以配置额外的选项
Vue.use(Lazyload, {
  lazyComponent: true,
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')


