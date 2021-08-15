<template>
  <n-layout position="absolute">
    <n-layout-header position="static">Header</n-layout-header>
    <n-layout has-sider>
      <n-layout-sider>Sider</n-layout-sider>
      <n-layout-content>
        <router-view />
      </n-layout-content>
    </n-layout>
    <n-layout-footer position="absolute">Footer</n-layout-footer>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { sessionStore } from '@/stores'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutContent, NLayoutHeader, NLayoutFooter, NLayoutSider } from 'naive-ui'

const router = useRouter()
const currentPage = ref(router.currentRoute)

const routerGuard = () => {
  if (currentPage.value.meta.auth && !sessionStore.connected.value) router.push('/login')
}
watch(currentPage, routerGuard)
onMounted(async () => {
  routerGuard()
})
</script>
