import Vue from 'vue'
import axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, axios)

// 将axios挂载到Vue实例,在组件中可以直接使用
Vue.prototype.$axios = axios
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 请求拦截器
axios.interceptors.request.use(function(config) {
  return config
}, function(error) {
  return Promise.reject(error)
})
// 响应拦截器
axios.interceptors.response.use(function(response) {
  return response
}, function(error) {
  return Promise.reject(error)
})