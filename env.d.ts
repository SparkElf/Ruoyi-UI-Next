/// <reference types="vite/client" />

import { useDict } from '@/utils/dict'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/ruoyi'
import axios from 'axios'

declare module 'vue' {
  //https://vuejs.org/api/utility-types#componentcustomproperties
  interface ComponentCustomProperties {
    useDict:typeof import('@/utils/dict')['useDict']
    parseTime:typeof import('@/utils/ruoyi')['parseTime']
    resetForm:typeof import('@/utils/ruoyi')['resetForm']
    addDateRange:typeof import('@/utils/ruoyi')['addDateRange']
    handleTree:typeof import('@/utils/ruoyi')['handleTree']
    selectDictLabel:typeof import('@/utils/ruoyi')['selectDictLabel']
    selectDictLabels:typeof import('@/utils/ruoyi')['selectDictLabels']
    $tab:typeof import('@/plugins/tab')['default']
    $modal:typeof import('@/plugins/modal')['default']
    $cache:typeof import('@/plugins/cache')['default']
    $auth:typeof import('@/plugins/auth')['default']
    $download:typeof import('@/plugins/download')['default']
  }
}

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}


// This can be directly added to any of your `.ts` files like `router.ts`
// It can also be added to a `.d.ts` file. Make sure it's included in
// project's tsconfig.json "files"
import 'vue-router'


declare module 'vue-router' {
  interface RouteMeta {
    title:string // 设置该路由在侧边栏和面包屑中展示的名字
    icon:string // 设置该路由的图标，支持 svg-class，也支持 el-icon-x element-ui 的 icon
    noCache:boolean // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    breadcrumb:boolean //  如果设置为false，则不会在breadcrumb面包屑中显示(默认 true)
    affix:boolean // 如果设置为true，它则会固定在tags-view中(默认 false)

    // 当路由设置了该属性，则会高亮相对应的侧边栏。
  // 这在某些场景非常有用，比如：一个文章的列表页路由为：/article/list
  // 点击文章进入文章详情页，这时候路由为/article/1，但你想在侧边栏高亮文章列表的路由，就可以进行如下设置
    activeMenu:string
  }
}
export {}