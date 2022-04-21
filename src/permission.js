import router from './router'
import store from './store'
import storage from 'store'
import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { i18nRender } from '@/locales'

import { listToTree, generator } from '@/router/generator-routers'
import asyncRoutersData from '@/router/async-data'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const allowList = ['login', 'register', 'registerResult'] // no redirect allowList
const loginRoutePath = '/user/login'
const defaultRoutePath = '/'

function setRouters({ to, from, next, result }) {
  // 前端未找到页面路由（固定不用改）
  const notFoundRouter = {
    path: '*',
    redirect: '/404',
    hidden: true
  }

  // 设置默认首页Index
  const defaultIndexName = 'index'

  // 根级菜单
  const rootRouter = {
    key: '',
    name: defaultIndexName,
    path: '',
    component: 'BasicLayout',
    meta: {
      title: '首页'
    },
    children: []
  }
  const menuNav = []
  const childrenNav = []
  const newResult = [...result]
  listToTree(newResult, childrenNav, 0)
  rootRouter.children = childrenNav
  rootRouter.redirect = childrenNav[0].redirect
  menuNav.push(rootRouter)
  const routers = generator(menuNav)
  console.log(routers, 'routers')
  routers.push(notFoundRouter)
  store.commit('SET_ROUTERS', routers)

  store.getters.addRouters.forEach((r) => {
    router.addRoute(r)
  })
  // 请求带有 redirect 重定向时，登录自动重定向到该地址
  const redirect = decodeURIComponent(from.query.redirect || to.path)
  if (to.path === redirect) {
    // set the replace: true so the navigation will not leave a history record
    next({ ...to, replace: true })
  } else {
    // 跳转到目的路由
    next({ path: redirect })
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && typeof to.meta.title !== 'undefined' && setDocumentTitle(`${i18nRender(to.meta.title)} - ${domTitle}`)
  /* has token */
  if (storage.get(ACCESS_TOKEN)) {
    if (to.path === loginRoutePath) {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      // 配置路由，因为没做动态路由需求
      if (!store.getters.addRouters.length) {
        setRouters({
          to,
          from,
          next,
          result: asyncRoutersData
        })
      } else {
        next()
      }

      // // 下面为动态路由逻辑，如需要动态路由，则可以打开下方逻辑判断
      // // check login user.roles is null
      // if (store.getters.roles.length === 0) {
      //   // request login userInfo
      //   store
      //     .dispatch('GetInfo')
      //     .then(res => {
      //       const roles = res.result && res.result.role
      //       // generate dynamic router
      //       store.dispatch('GenerateRoutes', { roles }).then(() => {
      //         // 根据roles权限生成可访问的路由表
      //         // 动态添加可访问路由表
      //         // VueRouter@3.5.0+ New API
      //         store.getters.addRouters.forEach(r => {
      //           router.addRoute(r)
      //         })
      //         // 请求带有 redirect 重定向时，登录自动重定向到该地址
      //         const redirect = decodeURIComponent(from.query.redirect || to.path)
      //         if (to.path === redirect) {
      //           // set the replace: true so the navigation will not leave a history record
      //           next({ ...to, replace: true })
      //         } else {
      //           // 跳转到目的路由
      //           next({ path: redirect })
      //         }
      //       })
      //     })
      //     .catch(() => {
      //       notification.error({
      //         message: '错误',
      //         description: '请求用户信息失败，请重试'
      //       })
      //       // 失败时，获取用户信息失败时，调用登出，来清空历史保留信息
      //       store.dispatch('Logout').then(() => {
      //         next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      //       })
      //     })
      // } else {
      //   next()
      // }
    }
  } else {
    if (allowList.includes(to.name)) {
      // 在免登录名单，直接进入
      next()
    } else {
      next({ path: loginRoutePath, query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
