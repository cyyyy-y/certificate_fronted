import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/Login'
import HomePage from "./views/HomePage";
import Download from "./views/Download";
import Upload from "./views/Upload";
import Generate from "./views/Generate";
import List from "./views/List";
import demo from "./views/demo";
import Charts from "./views/Charts";

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    {
      path: '/home',
      component: Home,
      children: [
        {
          path: '/',
          component: HomePage,
        },
        {
          path: '/homePage',
          component: HomePage,
        },
        {
          path: '/download',
          component: Download,
        },
        {
          path: '/upload',
          component: Upload,
        },
        {
          path: '/list',
          component: List,
        },
        {
          path: '/generate',
          component: Generate,
        },
        {
          path: '/demo',
          component: demo,
        },
        {
          path: '/charts',
          component: Charts,
        }
      ]
    },

  ]
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 从哪个路径跳转而来
  // next 是一个函数，表示放行
  // next() 放行   next('/login') 强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
