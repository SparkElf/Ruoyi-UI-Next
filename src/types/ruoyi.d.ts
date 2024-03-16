import type { RouteLocationMatched, RouteRecordRaw, RouteLocationNormalizedLoaded } from "vue-router"

export type DictItem = {
    value: string
    label: string
    elTagType?: string
    elTagClass?: string
}
export type AjaxResponse<T> ={
    msg?: string
    code: number
}&T


export type SingleResponse<T> = {
    msg?: string
    code: number
    data?: T
}
export type PageResponse<T> = {
    total: number
    rows: T[]
    msg?: string
    code: number
}
export type Route =Merge< RouteRecordRaw , {
    // 当设置 true 的时候该路由不会在侧边栏出现 如401，login等页面，或者如一些编辑页面/edit/1
    hidden: true // (默认 false)

    //当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
    redirect: string
    component: string

    // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
    // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
    // 若你想不管路由下面的 children 声明的个数都显示你的根路由
    // 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
    alwaysShow: true

    name: string // 设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
    query: any     // 访问路由的默认传递参数
    roles: string[]           // 访问路由的角色权限
    permissions: string[]      // 访问路由的菜单权限

    fullPath?:string //如果已经载入就会有
}>&{
    children?:Route[]
    name:string
}

