import { createWebHistory, createRouter, RouteRecordRaw } from 'vue-router'
import { useUserAuthStore } from '@/stores/auth'

const routes: RouteRecordRaw[] = [
  {
    path: '/panel',
    name: 'panel',
    meta: {
      show: true,
      title: '面板',
      requiresAuth: true,
    },
    redirect: '/panel/dashboard',
    component: () => import('@/layouts/index.vue'),
    children: [
      {
        path: 'denied',
        name: 'denied',
        component: () => import('@/views/Panel/Error/PermissionDenied.vue'),
        meta: {
          show: false
        }
      },
      {
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('@/views/Panel/Dashboard/index.vue'),
        meta: {
          show: true,
          title: '仪表盘',
          icon: 'Odometer',
          requiresAuth: true,
          requiredPermissions: ['ROLE_ADMIN', 'ROLE_USER'],
        },
      },
      {
        path: 'userManagement',
        name: 'userManagement',
        component: () => import('@/views/Panel/User.vue'),
        meta: {
          show: true,
          title: '用户管理',
          icon: 'UserFilled',
          requiresAuth: true,
          requiredPermissions: ['ROLE_ADMIN'],
        },
      },
      {
        path: 'book',
        name: 'book',
        component: () => import('@/views/Panel/Book.vue'),
        meta: {
          show: true,
          title: '图书管理',
          icon: 'Notebook',
          requiresAuth: true,
          requiredPermissions: ['ROLE_ADMIN', 'ROLE_USER']
        },
      },
      {
        path: 'borrow',
        name: 'borrow',
        component: () => import('@/views/Panel/Borrow.vue'),
        meta: {
          show: true,
          title: '借阅管理',
          icon: 'Promotion',
          requiresAuth: true,
          requiredPermissions: ['ROLE_ADMIN']
        }
      },
      {
        path: 'userBorrow',
        name: 'userBorrow',
        component: () => import('@/views/Panel/UserBorrow.vue'),
        meta: {
          show: true,
          title: '我的借阅',
          icon: 'Promotion',
          requiresAuth: true,
          requiredPermissions: ['ROLE_ADMIN', 'ROLE_USER'],
        },
      },
      // {
      //   path: 'statistics',
      //   name: 'statistics',
      //   meta: {
      //     show: true,
      //     title: '数据统计',
      //     icon: 'DataAnalysis',
      //   },
      //   children: [
      //     {
      //       path: 'visible',
      //       name: 'visible',
      //       component: () => import('@/views/Panel/Project.vue'),
      //       meta: {
      //         show: true,
      //         title: '数据可视化',
      //         icon: 'DataLine',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       }
      //     },
      //     {
      //       path: 'annual',
      //       name: 'annual',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true,
      //         title: '年度数据统计',
      //         icon: 'Calendar',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       }
      //     },
      //     {
      //       path: 'special',
      //       name: 'special',
      //       meta: {
      //         show: true,
      //         title: '专项统计',
      //         icon: 'List',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //       children: [
      //         {
      //           path: 'financial',
      //           name: 'financial',
      //           component: () => import('@/views/Panel/Menu.vue'),
      //           meta: {
      //             show: true,
      //             title: '财务数据统计',
      //             icon: 'Money',
      //             requiresAuth: true,
      //             requiredPermissions: ['ROLE_ADMIN'],
      //           },
      //         },
      //         {
      //           path: 'humanpower',
      //           name: 'humanpower',
      //           component: () => import('@/views/Panel/Menu.vue'),
      //           meta: {
      //             show: true,
      //             title: '人力成本统计',
      //             icon: 'UserFilled',
      //             requiresAuth: true,
      //             requiredPermissions: ['ROLE_ADMIN'],
      //           },
      //         },
      //       ]
      //     },
      //   ],
      // },
      // {
      //   path: 'dataEntry',
      //   name: 'dataEntry',
      //   component: () => import('@/views/Panel/Menu.vue'),
      //   meta: {
      //     show: true,
      //     title: '数据录入',
      //     icon: 'EditPen',
      //     requiresAuth: true,
      //     requiredPermissions: ['ROLE_ADMIN'],
      //   },
      //   children: [ 
      //     {
      //       path: 'member',
      //       name: 'member',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true,
      //         title: '员工数据录入',
      //         icon: 'UserFilled',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //     },
      //     {
      //       path: 'ticket',
      //       name: 'ticket',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true,
      //         title: '发票数据录入',
      //         icon: 'Ticket',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //     },
      //     {
      //       path: 'contract',
      //       name: 'contract',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true,
      //         title: '合同数据录入',
      //         icon: 'Document',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //     }
      //   ]
      // },
      // {
      //   path: 'backup',
      //   name: 'backup',
      //   component: () => import('@/views/Panel/Menu.vue'),
      //   meta: {
      //     show: true,
      //     title: '数据备份',
      //     icon: 'CopyDocument',
      //     requiresAuth: true,
      //     requiredPermissions: ['ROLE_ADMIN'],
      //   },
      //   children: [ 
      //     {
      //       path: 'import',
      //       name: 'import',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true,
      //         title: '数据导入',
      //         icon: 'Download',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //     },
      //     {
      //       path: 'export',
      //       name: 'export',
      //       component: () => import('@/views/Panel/Menu.vue'),
      //       meta: {
      //         show: true, 
      //         title: '数据导出',
      //         icon: 'Upload',
      //         requiresAuth: true,
      //         requiredPermissions: ['ROLE_ADMIN'],
      //       },
      //     },
      //   ]
      // }
    ],
  },
  {
    path: '/auth',
    name: 'auth',
    meta: {
      show: false,
      title: '鉴权',
    },
    component: () => import('@/views/Auth/index.vue'),
  },
  {
    path: '/',
    redirect: '/panel/dashboard'
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from, next) => {
  const user = useUserAuthStore()
  if (to.meta.requiresAuth && (!user.isLoggedIn)) {
    return next('/auth')
  } else if (user.isLoggedIn && to.path === '/auth') {
    return next('/panel/dashboard')
  } else if (to.meta.requiredPermissions && 
    !to.meta.requiredPermissions.some(
      permission => user.permissions.includes(permission)
    )) {
      return next('/panel/denied')
    }
  next()
})

export default router