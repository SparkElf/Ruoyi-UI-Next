import { createWebHistory, createRouter } from 'vue-router'

import type { Route } from '@/types/ruoyi';

/**
 * Note: 路由配置项
 *
 * hidden: true                     // 当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
 * alwaysShow: true                 // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                  // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
 *                                  // 若你想不管路由下面的 children 声明的个数都显示你的根路由
 *                                  // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
 * redirect: noRedirect             // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'               // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
 * query: '{"id": 1, "name": "ry"}' // 访问路由的默认传递参数
 * roles: ['admin', 'common']       // 访问路由的角色权限
 * permissions: ['a:a:a', 'b:b:b']  // 访问路由的菜单权限
 * meta : {
    noCache: true                   // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                  // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'                // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false               // 如果设置为false，则不会在breadcrumb面包屑中显示
    activeMenu: '/system/user'      // 当路由设置了该属性，则会高亮相对应的侧边栏。
  }
 */

// 公共路由
export const constantRoutes = [
  // {
  //   path: '/redirect',
  //   component: Layout,
  //   hidden: true,
  //   children: [
  //     {
  //       path: '/redirect/:path(.*)',
  //       component: () => import('@/views/redirect/index.vue')
  //     }
  //   ]
  // },
  {
    path: '',
    redirect: '/index',
  },
  {
    path: '/index',
    component: () => import('@/views/index.vue'),
    name: 'Index',
    meta: { title: '首页', icon: 'dashboard', affix: true }
  },
  {
    path: '/index/menu',
    component: () => import('@/views/system/menu/index.vue'),
    name: 'MenuIndex',
    meta: { title: 'menu', icon: 'dashboard', affix: true }
  },
  {
    path: '/login',
    component: () => import('@/views/login.vue'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register.vue'),
    hidden: true
  },
  {
    path: "/:pathMatch(.*)*",
    component: () => import('@/views/error/404.vue'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error/401.vue'),
    hidden: true
  },
  {
    path: '/user/profile',
    component: () => import('@/views/system/user/profile/index.vue'),
    hidden: true,
    name: 'Profile',
    meta: { title: '个人中心', icon: 'user' }
  },
  // {
  //   path: '/bpm/modelEditor',
  //   component: () => import('@/views/bpm/model/BpmModelEditor.vue'),
  //   hidden: true,
  //   name: 'BpmModelEditor',
  // }
] as Route[]

// 动态路由，基于用户权限动态去加载
export const dynamicRoutes = [

  {
    path: '/system/user-auth/role/:userId(\\d+)',
    component: () => import('@/views/system/user/authRole.vue'),
    hidden: true,
    permissions: ['system:user:edit'],
    meta: { title: '分配角色', activeMenu: '/system/user' },
    name: 'AuthRole',
  },
  {
    path: '/system/role-auth/user/:roleId(\\d+)',
    component: () => import('@/views/system/role/authUser.vue'),
    hidden: true,
    permissions: ['system:role:edit'],
    name: 'AuthUser',
    meta: { title: '分配用户', activeMenu: '/system/role' }
  },
  {
    path: '/system/dict-data/index/:dictId(\\d+)',
    component: () => import('@/views/system/dict/data.vue'),
    name: 'Data',
    meta: { title: '字典数据', activeMenu: '/system/dict' },
    hidden: true,
    permissions: ['system:dict:list'],
  },
  {
    path: '/monitor/job-log/index/:jobId(\\d+)',
    component: () => import('@/views/monitor/job/log.vue'),
    hidden: true,
    permissions: ['monitor:job:list'],
    name: 'JobLog',
    meta: { title: '调度日志', activeMenu: '/monitor/job' }
  },
  {
    path: '/tool/gen-edit/index/:tableId(\\d+)',
    component: () => import('@/views/tool/gen/editTable.vue'),
    name: 'GenEdit',
    meta: { title: '修改生成配置', activeMenu: '/tool/gen' },
    hidden: true,
    permissions: ['tool:gen:edit'],
  }
] as unknown as Route[]

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes as any,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
});

const notContentPage = [
  "/login",
  "/register",
  "/401",
  "/404",
]
export function isContentPage(route: {
  path: string
}) {
  return !notContentPage.includes(route.path)
}
export default router;
