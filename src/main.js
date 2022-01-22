import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/style/reset.css'
import store from './store'
import { mapState, mapActions } from 'vuex'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.mixin({
  computed: {
    ...mapState(['userInfo'])
  },
  methods: {
    ...mapActions(['getUserInfoFn'])
  }
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
