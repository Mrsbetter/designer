import Vue from 'vue'
import '@/styles/index.scss' // global css
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './components/CanvasBar/topo/store'

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
