<template>
  <div v-if="!item.hidden">
    <el-sub-menu v-if="hasShowChildren()"  ref="subMenu" :index="resolvePath()" teleported >
      <template v-if="item.meta" #title>
        <svg-icon :icon-class="item.meta && item.meta.icon" />
        <span class="menu-title" @click.stop="handleSubMenuClick">{{ item.meta.title }}</span>
      </template>

      <sidebar-item
        v-for="(child, index) in item.children"
        :key="child.path"
        :item="child"
        :base-path="resolvePath()"
        class="nest-menu"
      />
    </el-sub-menu>
    <template v-else-if="item.meta">
      <app-link :to="resolvePath()">
        <el-menu-item :index="resolvePath()" >
          <svg-icon :icon-class="item.meta.icon"/>
          <template #title><span class="menu-title">{{ item.meta.title }}</span></template>
        </el-menu-item>
      </app-link>
    </template>
  </div>
</template>

<script setup lang="ts">

import AppLink from './Link.vue'
import { getNormalPath } from '@/utils/ruoyi'
import type { Route } from '@/types/ruoyi';
declare type SideBarRoute=Route&{noShowingChildren:boolean;children:SideBarRoute[]};
const props=withDefaults(defineProps<{
  item: SideBarRoute

  basePath?:string
}>(),{

  basePath:''
})
const router=useRouter()

function resolvePath() {
  const item=props.item
  if(item.meta?.link)return item.meta.link//外链
  if (item.query) {
    let query = JSON.parse(item.query);
    let url=new URL(getNormalPath(props.basePath + '/' + item.path))
    Object.keys(query).forEach(key=>{
      url.searchParams.append(key, query[key])
    })
    return url.toString()
  }

  return getNormalPath(props.basePath + '/' + item.path)
}

function handleSubMenuClick(){
  if(props.item.component){
    if(props.item.redirect)router.push(props.item.redirect)
    else if(props.item.path)router.push(props.item.path)
  }
}

function hasShowChildren(){
  return props.item.children&&props.item.children.length&&props.item.children.some(child=>!child.hidden)
}

</script>: {}: string: string: string | any[]: {}: string: string: string | any[]
