import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 标签初始化
import 'normalize.css'
// 引入全局样式
import '@/styles/index.scss'
// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入css动画库
import 'animate.css'

// size默认small
Vue.use(ElementUI, { size: 'small' })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
