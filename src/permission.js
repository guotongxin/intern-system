// import router, { asyncRoutes } from './router'
import router from './router'
// 导入进度条插件
import NProgress from 'nprogress'
// 导入进度条样式
import 'nprogress/nprogress.css'
// import router, { asyncRoutes } from './router'
// token <=> vuex <=> Cookie
import store from '@/store'
//
import getPageTitle from '@/utils/get-page-title'

const whiteList = ['/login', '/404'] // 未登录状态下, 应该可以看到404和登录页面
// 路由前置守卫
router.beforeEach(async(to, from, next) => {
  document.title = getPageTitle(to.meta.title)
  // start progress bar
  NProgress.start()
  // 获取到token
  const token = store.getters.token
  if (token) { // 判断是否有token
    if (!store.getters.name) {
      // 获取登录用户信息
      const menu = await store.dispatch('user/getLoginUserInfoAction') // 拉取info
      console.log('Action', menu)
      console.log(store.state.user.userInfo)
      const role = store.state.user.userInfo.role
      console.log('hhroles', role)
      const roles = []
      roles.push(role)
      // console.log('roles', roles)
      // //     // 把获取到的role传进去进行匹配，生成可以访问的路由
      // const asyncRoutes = store.dispatch('permission/generateRoutes', { roles })
      // router.addRoutes(asyncRoutes)
      // .then(() => {
      //   console.log('执行generateRoutes')
      //   //     // 动态添加可访问路由表（核心代码，没有它啥也干不了）
      //   router.addRoutes(asyncRoutes)

      //   //       // hack方法 确保addRoutes已完成
      //   next({ ...to, replace: true })
      // }).catch(() => {

      // })
    } else {
      // next({
      //   path: to.path,
      //   replace: true // 类似this.$router.replace()
      // })
    }
    if (to.path === '/login') {
      next({ path: '/' })
    } else { // 其他页面放行
      // console.log('name', store.getters.name)
      next()
    }
  } else { // 没有token 未登录状态
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next('/login') // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
