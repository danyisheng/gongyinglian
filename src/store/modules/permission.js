import {constantRoutes} from '@/router'
import {accessedRoutes} from "@/router/accessedRoutes";
import {getMenusList} from '@/api/user'

/**
 * @description 将后端菜单树转换为路由树
 * @param {Array} menus
 * @returns {Array}
 */
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
        path: route.Level === 1 ? ('/' + route.Value) : route.Value,
        name: route.Value,
        meta: {
            title: route.title,
            icon: route.icon,
            flag: !route.IsEnble
        }
    }
    obj.component = () => import(`@/${menu.Url}`)
    if (route.Level === 1) {
        obj.redirect = 'noRedirect'
    }
    return obj
}

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
    if (route.meta && route.meta.roles) {
        return roles.some(role => route.meta.roles.includes(role))
    } else {
        return true
    }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
    const res = []

    routes.forEach(route => {
        const tmp = {...route}
        if (hasPermission(roles, tmp)) {
            if (tmp.children) {
                tmp.children = filterAsyncRoutes(tmp.children, roles)
            }
            res.push(tmp)
        }
    })

    return res
}

const state = {
    routes: [],
    addRoutes: []
}

const mutations = {
    SET_ROUTES: (state, routes) => {
        state.addRoutes = routes
        state.routes = constantRoutes.concat(routes)
    }
}

const actions = {
    generateRoutes({commit}, roles) {
        return new Promise(resolve => {
            getMenusList().then(res => {
                if (res.data.ErrorCode === 200) {
                    let routeDatas = backendMenusToRouters(res.data.Data)
                    commit('SET_ROUTES', routeDatas)
                    resolve(routeDatas)
                }
            })
        })
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
