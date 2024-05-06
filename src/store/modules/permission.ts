import auth from '@/plugins/auth'
import router, { constantRoutes, dynamicRoutes } from '@/router'
import { getRouters } from '@/api/menu'
import Layout from '@/layout/index'
import ParentView from '@/components/ParentView/index.vue'
import InnerLink from '@/layout/components/InnerLink/index.vue'
import type { Route } from '@/types/ruoyi'

// 匹配views里面所有的.vue文件
const modules = import.meta.glob('./../../views/**/*.vue')

export const usePermissionStore = defineStore(
  'permission',
  {
    state: () => ({
      routes: [] as Route[],
      addRoutes: [] as Route[],
      defaultRoutes: [] as Route[],
      topbarRouters: [] as Route[],
      sidebarRoutes: [] as Route[],
      flattenRoutesMap:{} as Record<string,Route>
    }),
    actions: {
      setRoutes(routes: Route[]) {
        this.addRoutes = routes
        this.routes = constantRoutes.concat(routes)
      },
      setDefaultRoutes(routes: Route[]) {
        this.defaultRoutes = constantRoutes.concat(routes)
      },
      setTopbarRoutes(routes: Route[]) {
        this.topbarRouters = routes
      },
      setSidebarRoutes(routes: Route[]) {
        this.sidebarRoutes = routes
      },
      setFlattenRoutesMap(routes: Route[]) {
        routes.forEach((route) => {
          if(route.name)
            this.flattenRoutesMap[route.name] = route
        })
      },
      generateRoutes() {
        return new Promise(resolve => {
          // 向后端请求路由数据
          getRouters().then((res: { data: any }) => {

            const sdata = structuredClone(res.data)//深拷贝
            const rdata = structuredClone(res.data)//深拷贝
            const defaultData = structuredClone(res.data)//深拷贝
            const sidebarRoutes = filterAsyncRouter(sdata)
            const rewriteRoutes = flattenRoutes(rdata)
            const defaultRoutes = filterAsyncRouter(defaultData)
            const asyncRoutes = filterDynamicRoutes(dynamicRoutes)
            asyncRoutes.forEach(route => { router.addRoute(route) })

            this.setRoutes(rewriteRoutes)
            this.setSidebarRoutes(constantRoutes.concat(sidebarRoutes))
            addRoutesParent(this.sidebarRoutes)
            this.setDefaultRoutes(sidebarRoutes)
            this.setTopbarRoutes(defaultRoutes)
            this.setFlattenRoutesMap(rewriteRoutes)
            resolve(rewriteRoutes)
          })
        })
      }
    }
  })

function flattenRoutes(routes: Route[]) {
  return routes.flatMap(v=>{
    const root=[] as Route[]
    flattenRoute(v, root as any)
    return  root
  })
}
//每次遇到component就提取出路由
function flattenRoute(route: Route, root:Route[]) {
  if (route == null) return
  if (route.component){
    route.component=loadView(route.component as string)
    root.push(route)
  }
  route.children?.forEach(child => {
    child.path = route.path  + child.path
    flattenRoute(child, root)
  })
}
function addRoutesParent(routes?:Route[]){

  routes?.forEach(route=>{
    route.children?.forEach(child=>{
      child.parent=route
    })
    addRoutesParent(route.children)
  })
}
// 遍历后台传来的路由字符串，转换为组件对象
function filterAsyncRouter(asyncRouterMap: any[], lastRouter?: Route, type = false) {
  return asyncRouterMap.filter((route: Route) => {
    if (type && route.children) {
      route.children = filterChildren(route.children)
    }
    if (route.component) {
      // Layout ParentView 组件特殊处理
      if (route.component === 'Layout') {
        route.component = Layout
      } else if (route.component === 'ParentView') {
        route.component = ParentView
      } else if (route.component === 'InnerLink') {
        route.component = InnerLink
      } else {
        route.component = loadView(route.component as string)
      }
    }
    if (route.children != null && route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children, route, type)
    } else {
      delete route['children']
      delete route['redirect']
    }
    return true
  })
}

function filterChildren(childrenMap: Route[], lastRouter?: Route) {
  var children: any[] = []
  childrenMap.forEach((el: Route, index: any) => {
    if (el.children && el.children.length) {
      if (el.component === 'ParentView' && !lastRouter) {
        el.children.forEach((c: Route) => {
          c.path = el.path + '/' + c.path
          if (c.children && c.children.length) {
            children = children.concat(filterChildren(c.children, c))
            return
          }
          children.push(c)
        })
        return
      }
    }
    if (lastRouter) {
      el.path = lastRouter.path + '/' + el.path
      if (el.children && el.children.length) {
        children = children.concat(filterChildren(el.children, el))
        return
      }
    }
    children = children.concat(el)
  })
  return children
}

// 动态路由遍历，验证是否具备权限
export function filterDynamicRoutes(routes: any[]) {
  const res: any[] = []
  routes.forEach((route: { permissions: any; roles: any }) => {
    if (route.permissions) {
      if (auth.hasPermiOr(route.permissions)) {
        res.push(route)
      }
    } else if (route.roles) {
      if (auth.hasRoleOr(route.roles)) {
        res.push(route)
      }
    }
  })
  return res
}

export const loadView = (view: string) => {
  let res;
  for (const path in modules) {
    const dir = path.split('views/')[1].split('.vue')[0];
    if (dir === view) {
      res = () => modules[path]();
    }
  }
  return res;
}

export default usePermissionStore
