import router, { resetRouter,notFindRouter } from './router'
import {accessedRoutes} from './router/accessedRoutes'
import store from './store'
import {Message} from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {getToken} from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({showSpinner: false}) // NProgress Configuration

const whiteList = ['/login', '/auth-redirect', '/fogetPwd', '/regist']

export const backendMenusToRouters = (menus) => {
    let routers = []
    menus.map(menu => {
        // 将后端数据转换成路由数据
        let route = backendMenuToRoute(menu) // 传p 代表父级
        // 如果后端数据有下级，则递归处理下级
        if (menu.children && menu.children.length !== 0) {
            route.children = backendMenusToRouters(menu.children)
        }
        routers.push(route)
    })
    return routers
}

/**
 * @description 将后端菜单转换为路由
 * @param {Object} menu
 * @returns {Object}
 */
const backendMenuToRoute = (menu) => {
    // 具体内容根据自己的数据结构来定，这里需要注意的一点是
    // 原先routers写法是component: () => import('@/view/error-page/404.vue')
    // 经过json数据转换，这里会丢失，所以需要按照上面提过的做转换，下面只写了核心点，其他自行处理
    let route = Object.assign({}, menu)
    // route.component = () => import(`@/${menu.component}`)
    // route.component = resolve => require([`@/${menu.Url}`], resolve)
    let obj = {
        path: route.path,
        name: route.key,
        meta: {
            title: route.title,
            icon: route.icon,
            flag: route.IsNeedAction
        }
    }
    obj.component = () => import(`@/${menu.Url}`)
    if (route.level === '1') {
        obj.redirect = 'noRedirect'
    }
    return obj
}
// let hasRoles = false
router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()
    if (hasToken) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({path: '/'})
            NProgress.done()
        } else {
            // determine whether the user has obtained his permission roles through getInfo
            // console.log(store.getters.roles,'getters')
            //重新刷新vuex数据全部丢失
             let hasRoles = store.getters.roles && store.getters.roles.length > 0
            if (hasRoles) {
                // console.log(444)
                next()
            } else {
                store.dispatch('user/getInfo').then(res => {
                    store.dispatch('permission/generateRoutes', res.UserInfo.RoleIdList).then(accessRoutes => {
                        // console.log(accessRoutes,'accessRoutes')
                        resetRouter()
                        if (accessRoutes.length > 0) {
                            accessRoutes=accessRoutes.concat(notFindRouter)
                            router.addRoutes(accessRoutes)
                            //添加404路由
                            // router.addRoutes(notFindRouter)
                            next({ ...to, replace: true })
                        } else {
                            next()
                        }
                    })
                }).catch (error => {
                    store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                })
            }
        }
    } else {
        /* has no token*/
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
