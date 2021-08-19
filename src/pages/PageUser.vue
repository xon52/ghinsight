<template>
  <router-view />
</template>

<script lang="ts" setup>
import { ref, computed, watch, onMounted } from 'vue'
import { sessionStore } from '@/stores'
import { useRouter } from 'vue-router'

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
