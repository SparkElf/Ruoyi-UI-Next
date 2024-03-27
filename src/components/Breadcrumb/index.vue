<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">

    <transition-group name="breadcrumb">

      <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.name">
        <a v-if="item.component" :href="item.redirect ? item.redirect : item.path">{{ item.meta?.title }}</a>
        <span v-else>{{ item.meta?.title }}</span>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script setup lang="ts">
import usePermissionStore from "@/store/modules/permission";
import type { Route } from "@/types/ruoyi";
import { findRoute } from "@/utils/route"
const route = useRoute();
const { sidebarRoutes, flattenRoutesMap } = storeToRefs(usePermissionStore());

const levelList = ref<Route[]>([])

function getBreadcrumb(to:Route) {
  const name = to.name as string
  if (!flattenRoutesMap.value[name]) {
    levelList.value = []
    return
  }
  let list = [flattenRoutesMap.value[name]] as Route[]
  let curSidebarRoute = findRoute(name, sidebarRoutes.value)

  while (curSidebarRoute?.parent) {
    list.push(curSidebarRoute.parent)
    curSidebarRoute = curSidebarRoute.parent
  }

  levelList.value = list.reverse()

  levelList.value.forEach((item, index) => {
    if (flattenRoutesMap.value[item.name]) list[index] = flattenRoutesMap.value[item.name]
  })
}
// onBeforeRouteUpdate((to) => {
//   getBreadcrumb(to as any)
// })
watch(route,(newv,oldv) => {
  getBreadcrumb(newv as any)
})
//getBreadcrumb();
</script>

<style lang='scss' scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  span {
    color: #97a8be;
    cursor: text;
  }

  a {
    font-weight: 500;
    cursor:pointer !important;
    &:hover{
      color: var(--el-color-primary)!important;
    }

  }

}
</style>