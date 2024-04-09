<template>
    <Layout v-if="isContentPage(route)"/>
    <router-view v-else></router-view>
</template>

<script setup lang="ts">
import useSettingsStore from '@/store/modules/settings'
import { handleThemeStyle } from '@/utils/theme'
import Layout from '@/layout/index.vue'
import { isContentPage } from '@/router'
const route=useRoute()

onMounted(() => {
  nextTick(() => {
    // 初始化主题样式
    handleThemeStyle(useSettingsStore().theme)
  })
})
</script>
