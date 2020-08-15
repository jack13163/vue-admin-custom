import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import router from './router/index.js'
import resource from 'vue-resource'
import md5 from 'js-md5'
import VueCookies from 'vue-cookies'
import AJAX from './util/ajaxfun.js'
import Storage from './util/storagefun.js'
import UE from 'vue-quill-editor'

Vue.use(ElementUI)

// 封装了可以携带Cookie的GET和POST方法
Vue.use(AJAX)
Vue.use(VueCookies)
Vue.use(resource)
Vue.use(Storage)

// 富文本编辑器
Vue.use(UE)

// 定义全局变量
Vue.prototype.$md5 = md5

export default new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
