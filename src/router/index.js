import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },

    {
        path: '/404',
        component: () =>
            import ('@/views/404'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () =>
                import ('@/views/dashboard/echarts2'),
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    {
        path: '/production',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Production',
            component: () =>
                import ('@/pages/production/index'),
            meta: { title: '产品管理', icon: 'table' }
        }]
    },


    {
        path: '/form',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Form',
            component: () =>
                import ('@/views/form/index'),
            meta: { title: '栏目管理', icon: 'form' }
        }]
    },
    {
        path: '/nested',
        component: Layout,
        name: 'account',
        meta: { title: '账单管理', icon: 'nested' },
        children: [{
                path: 'customerAccount',
                name: 'customer',
                component: () =>
                    import ('@/views/nested/customer'),
                meta: { title: '顾客账单' }
            },
            {
                path: 'employeeAccount',
                name: 'employee',
                component: () =>
                    import ('@/views/nested/emp'),
                meta: { title: '员工账单' }
            },
            {
                path: 'systemAccount',
                name: 'system',
                component: () =>
                    import ('@/views/nested/system'),
                meta: { title: '系统账单' }
            },
        ]
    },
    {
        path: '/order',
        component: Layout,
        children: [{
                path: 'index',
                name: 'Order',
                component: () =>
                    import ('@/pages/order/index'),
                meta: { title: '订单管理', icon: 'dingdan' }
            },
            {
                path: 'detail',
                hidden: true,
                name: 'OrderDetail',
                component: () =>
                    import ('@/pages/order/details'),
            },
        ]
    },
    {
        path: '/tree',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Tree',
            component: () =>
                import ('@/views/tree/index'),
            meta: { title: '员工管理', icon: 'tree' }
        }]
    },
    {
        path: '/customer',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Tree',
            component: () =>
                import ('@/views/customer/index'),
            meta: { title: '顾客管理', icon: 'customer' }
        }]
    },
    {
        path: '/zixun',
        component: Layout,
        redirect: '/zixun/zx1',
        name: 'Zixun',
        meta: {
            title: '网站资讯',
            icon: 'zixun'
        },
        children: [{
                path: 'zx1',
                component: () =>
                    import ('@/views/zixun/zx1/index'), // Parent router-view
                name: 'Zx1',
                meta: { title: 'Zx1' }
            },


            {
                path: 'zx2',
                component: () =>
                    import ('@/views/zixun/zx2/index'),
                name: 'Zx2',
                meta: { title: 'zx2' }
            }
        ]
    },
    {
        path: '/lunbo',
        component: Layout,
        children: [{
            path: 'index',
            name: 'Lunbo',
            component: () =>
                import ('@/views/lunbo/index'),
            meta: { title: '轮播管理', icon: 'lunbo' }
        }]
    },
    // {
    //     path: 'external-link',
    //     component: Layout,
    //     children: [{
    //         path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
    //         meta: { title: 'External Link', icon: 'link' }
    //     }]
    // },

    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher // reset router
}

export default router