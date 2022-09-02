import { default as router } from './router'
import store from './store'
import { getToken } from '@/utils/auth'
const whiteList = [
  '/login'
]

router.beforeEach(async(to, from, next) => {
  // 页面进入前取消前面接口
  window._axiosPromiseArr.forEach((ele, index) => {
    ele.cancel(index)
    delete window._axiosPromiseArr[index]
  })

  if (to.path === '/404') {
    next()
  } else {
    // token
    const hasToken = getToken()
    if (hasToken) {
      const hasUser = store.state.user.userInfo.username
      if (hasUser) { // 是否有用户信息
        const menuList = store.state.menu.menuList
        const permission = store.state.menu.permission
        if (menuList && menuList.length) { // 是否有菜单
          if (to.path === '/login') { // 跳转至 login
            next({ path: menuList[0].path })
          } else { // 正常跳转
            const toPermission = to.meta.permission
            if (permission.includes(toPermission)) {
              next()
            } else {
              next('/404')
            }
          }
        } else {
          try {
            await store.dispatch('menu/getMenuPermList')
            const menuList = store.state.menu.menuList
            if (menuList && menuList.length) {
              next({ ...to, replace: true })
            } else {
              next({ path: '/404' })
            }
          } catch (error) {
            next({ path: '/404' })
          }
        }
      } else {
        try { // 获取用户信息
          await store.dispatch('user/getInfo')
          if (!store.state.user.userInfo.username) { // 是否有用户信息
            await store.dispatch('user/resetToken')
            next({ path: '/login' })
          }
          next({ ...to, replace: true })
        } catch (ex) {
          console.error(ex)
          await store.dispatch('user/resetToken')
          next({ path: '/login' })
        }
      }
    } else {
      if (whiteList.indexOf(to.path) !== -1) {
        next()
      } else {
        next({
          path: '/login'
        })
      }
    }
  }
})
