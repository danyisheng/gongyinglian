import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: () => import('@/views/redirect/index')
            }
        ]
    },
    {

        path: '/login',
        component: () => import('@/views/login/index'),
        hidden: true
    },
    {
        path: '/fogetPwd',
        component: () => import('@/views/login/loginComponet/fogetPwd'),
        hidden: true
    },
    {
        path: '/regist',
        component: () => import('@/views/login/loginComponet/regist'),
        hidden: true
    },
    {
        path: '/404',
        component: () => import('@/views/error-page/404'),
        hidden: true
    },
    {
        path: '/401',
        component: () => import('@/views/error-page/401'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: 'dashboard',
        children: [
            {
                path: 'dashboard',
                component: () => import('@/views/dashboard/index'),
                name: 'Dashboard',
                meta: {title: '首页', icon: 'el-icon-shouye iconfont', affix: true}
            },
            {
                hidden: true,
                path: 'qualicationApprove',
                component: () => import('@/views/qualificationManage/qualicationApprove'),
                name: 'qualicationApprove',
                meta: {title: '供应商商认证', icon: ''}
            },
            {
                hidden: true,
                path: 'processFail',
                component: () => import('@/views/qualificationManage/processFail'),
                name: 'processFail',
                meta: {title: '供应商商认证', icon: ''}
            },
            {
                hidden: true,
                path: 'supplyGoodsInfo',
                component: () => import('@/views/supplyGoodsManage/supplyGoodsInfo'),
                name: 'supplyGoodsInfo',
                meta: {title: '供货商商品详情', icon: ''}
            }
        ]
    },
    // {
    //     path: '/supplyGoodsManage',
    //     component: Layout,
    //     name: 'supplyGoodsManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '商品管理（供货商）',
    //         icon: 'el-icon-yunliankeji- iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'goodsList',
    //             component: () => import('@/views/supplyGoodsManage/goodsList'),
    //             name: 'goodsClass',
    //             meta: {title: '商品列表'}
    //         },
    //         {
    //             path: 'auditList',
    //             component: () => import('@/views/supplyGoodsManage/auditList'),
    //             name: 'auditList',
    //             meta: {title: '申请记录', icon: ''}
    //         },
    //         {
    //             path: 'supplyGoodsInfo',
    //             component: () => import('@/views/supplyGoodsManage/supplyGoodsInfo'),
    //             name: 'supplyGoodsInfo',
    //             meta: {title: '商品详情', icon: '', flag: true}
    //         },
    //         {
    //             path: 'supplyAddGoods',
    //             component: () => import('@/views/supplyGoodsManage/supplyAddGoods'),
    //             name: 'supplyAddGoods',
    //             meta: {title: '新增商品', icon: '', flag: true}
    //         }
    //     ]
    // },
    // {
    //     path: '/platformGoodsManage',
    //     component: Layout,
    //     name: 'platformGoodsManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '商品管理（平台）',
    //         icon: 'el-icon-shangpin iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'goodsList',
    //             component: () => import('@/views/platformGoodsManage/goodsList'),
    //             name: 'goodsList',
    //             meta: { title: '平台商品列表', icon: '' }
    //         },
    //         {
    //             path: 'supplyGoodsList',
    //             component: () => import('@/views/platformGoodsManage/supplyGoodsList'),
    //             name: 'supplyGoodsList',
    //             meta: { title: '供应商商品列表', icon: '' }
    //         },
    //         {
    //             path: 'applyList',
    //             component: () => import('@/views/platformGoodsManage/applyList'),
    //             name: 'applyList',
    //             meta: { title: '审核记录' }
    //         },
    //         {
    //             path: 'platformAddGoods',
    //             component: () => import('@/views/platformGoodsManage/platformAddGoods'),
    //             name: 'platformAddGoods',
    //             meta: {title: '新增商品', icon: '', flag: true}
    //         },
    //         {
    //             path: 'platformGoodsInfo',
    //             component: () => import('@/views/platformGoodsManage/platformGoodsInfo'),
    //             name: 'platformGoodsInfo',
    //             meta: {title: '商品详情', icon: '', flag: true}
    //         }
    //     ]
    // },
    // {
    //     path: '/purchaseManage',
    //     component: Layout,
    //     name: 'purchaseManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '采购管理',
    //         icon: 'el-icon-caigou iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'purchaseList',
    //             component: () => import('@/views/purchaseManage/purchaseList'),
    //             name: 'purchaseList',
    //             meta: { title: '采购订单', icon: '' }
    //         },
    //         {
    //             path: 'purchaseDetail',
    //             component: () => import('@/views/purchaseManage/purchaseDetail'),
    //             name: 'purchaseDetail',
    //             meta: {title: '采购订单详情', icon: '', flag: true}
    //         },
    //         {
    //             path: 'purchaseOrder',
    //             component: () => import('@/views/purchaseManage/purchaseOrder'),
    //             name: 'purchaseOrder',
    //             meta: {title: '采购单', icon: '', flag: true}
    //         }
    //     ]
    // },
    // {
    //     path: '/cargoDamageManage',
    //     component: Layout,
    //     name: 'cargoDamageManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '货损管理',
    //         icon: 'el-icon-sunhuai iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'damageList',
    //             component: () => import('@/views/cargoDamageManage/damageList'),
    //             name: 'damageList',
    //             meta: { title: '货损列表', icon: '' }
    //         },
    //         {
    //             path: 'replacementList',
    //             component: () => import('@/views/cargoDamageManage/replacementList'),
    //             name: 'replacementList',
    //             meta: { title: '补发订单', icon: '' }
    //         },
    //     ]
    // },
    // {
    //     path: '/supplyReconciliationManage',
    //     component: Layout,
    //     name: 'supplyReconciliationManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '对账管理（供货商）',
    //         icon: 'el-icon-duizhang iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'reconciliationList',
    //             component: () => import('@/views/supplyReconciliationManage/reconciliationList'),
    //             name: 'reconciliationList',
    //             meta: { title: '对账管理', icon: '' }
    //         },
    //         {
    //             path: 'settlementList',
    //             component: () => import('@/views/supplyReconciliationManage/settlementList'),
    //             name: 'settlementList',
    //             meta: { title: '结算记录', icon: '' }
    //         },
    //     ]
    // },
    // {
    //     path: '/platformReconciliationManage',
    //     component: Layout,
    //     name: 'platformReconciliationManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '对账管理（平台）',
    //         icon: 'el-icon-duizhangzhongxin iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'reconciliationList',
    //             component: () => import('@/views/platformReconciliationManage/reconciliationList'),
    //             name: 'reconciliationList',
    //             meta: { title: '对账管理', icon: '' }
    //         },
    //         {
    //             path: 'settlementList',
    //             component: () => import('@/views/platformReconciliationManage/settlementList'),
    //             name: 'settlementList',
    //             meta: { title: '结算记录', icon: '' }
    //         },
    //     ]
    // },
    // {
    //     path: '/qualificationManage',
    //     component: Layout,
    //     name: 'qualificationManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '资质审核',
    //         icon: 'el-icon-zizhi iconfont'
    //     },
    //     children: [
    //
    //     ]
    // },
    // {
    //     path: '/supplyManage',
    //     component: Layout,
    //     name: 'supplyManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '供应商管理',
    //         icon: 'el-icon-lianyinggonghuoshang iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'supplyList',
    //             component: () => import('@/views/supplyManage/supplyList'),
    //             name: 'supplyList',
    //             meta: { title: '供应商管理', icon: '' }
    //         }
    //     ]
    // },
    // {
    //     path: '/systemManage',
    //     component: Layout,
    //     name: 'systemManage',
    //     redirect: 'noRedirect',
    //     meta: {
    //         title: '系统设置',
    //         icon: 'el-icon-xitong iconfont'
    //     },
    //     children: [
    //         {
    //             path: 'classList',
    //             component: () => import('@/views/systemManage/classList'),
    //             name: 'shopList',
    //             meta: {title: '类目管理', icon: ''}
    //         },
    //         {
    //             path: 'salesAttribute',
    //             component: () => import('@/views/systemManage/salesAttribute'),
    //             name: 'salesAttribute',
    //             meta: {title: '销售属性', icon: ''}
    //         },
    //         {
    //             path: 'user',
    //             component: () => import('@/views/systemManage/user'),
    //             name: 'user',
    //             meta: {title: '账号信息', icon: ''}
    //         },
    //         {
    //             path: 'menu',
    //             component: () => import('@/views/systemManage/menu'),
    //             name: 'menu',
    //             meta: {title: '功能菜单', icon: ''}
    //         },
    //         {
    //             path: '',
    //             component: () => import('@/views/systemManage/role'),
    //             name: 'role',
    //             meta: {title: '角色信息', icon: ''}
    //         },
    //         {
    //             path: 'permission',
    //             component: () => import('@/views/systemManage/permission'),
    //             name: 'permission',
    //             meta: {title: '权限分配', icon: ''}
    //         },
    //         {
    //             path: 'permissionBtn',
    //             component: () => import('@/views/systemManage/permissionBtn'),
    //             name: 'permissionBtn',
    //             meta: {title: '菜单按钮', icon: ''}
    //         },
    //         {
    //             path: 'components',
    //             component: () => import('@/views/systemManage/components'),
    //             name: 'components',
    //             meta: {title: '组件模版', icon: ''}
    //         },
    //     ]
    // },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
    /** when your routing map is too long, you can split it into small modules **/
]

const createRouter = () => new Router({
    mode: 'hash', // require service support
    scrollBehavior: () => ({y: 0}),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}
export const notFindRouter=[
    {
        path: '*',
        redirect: '/404'
    }
]
    
        
      


export default router
