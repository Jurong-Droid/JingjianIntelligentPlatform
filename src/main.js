import Vue from 'vue'
import 'normalize.css/normalize.css'// A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/zh-CN'
import App from './App'
import router from './router'
import store from './store'
import '@/icons' // icon
import '@/permission' // 权限
import vueSeamlessScroll from 'vue-seamless-scroll'
import {default as api} from './utils/api'
import directives from "@/directives/permission";
import {hasPermission} from "./utils/hasPermission"
import 'default-passive-events' //Passive Event Listeners特性当前仅支持mousewheel/touch相关事件
import "./text/text.scss";
import VueScroll from '@david-j/vue-j-scroll';
Vue.use(VueScroll);


// import './styles/comon0.css'// 全局引用另加的大屏主页css


Vue.use(ElementUI, {locale})
Vue.prototype.api = api
Vue.use(vueSeamlessScroll)
//全局的常量
Vue.prototype.hasPerm = hasPermission
Vue.use(directives);
//生产环境时自动设置为 false 以阻止 vue 在启动时生成生产提示。
Vue.config.productionTip = (process.env.NODE_ENV != 'production')
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {App}
})
