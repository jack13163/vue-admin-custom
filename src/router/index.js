import Router from 'vue-router'
import Login from '@/components/Login.vue'
import Vue from 'vue'
import Layout from '@/components/admin/Layout.vue'
import TreeDemo from '@/components/demo/TreeDemo.vue'

// 注册路由器
Vue.use(Router)

// 定义路由规则
const router = new Router({
  routes: [{
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'index',
    component: Layout
  },
  {
    path: '/admin',
    name: 'admin',
    component: Layout,
    meta: {
      // requiresAuth: true// 标记需要登陆才能访问
    }
  },
  {
    path: '/tree-demo',
    name: 'TreeDemo',
    component: TreeDemo
  }]
})

// 请求拦截器，过滤未登陆请求
router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta && route.meta.requiresAuth)) {
    // 根据Cookie判断是否认证成功，后端如果判断非法就将cookie设置过期
    var cookie = Vue.prototype.$cookies.get('miaosha_cookie')
    if (cookie == null) {
      // 这里会设置redirect参数
      console.log(to.fullPath)
      next({
        path: '/login',
        query: {redirect: to.fullPath}
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
