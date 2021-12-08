import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Element from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import htmlToPdf from "./components/utils/htmlToPdf";
import echarts from 'echarts';

Vue.prototype.$echarts = echarts;

Vue.config.productionTip = false;
Vue.use(Element);
// 使用Vue.use()方法就会调用工具方法中的install方法
Vue.use(htmlToPdf);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
