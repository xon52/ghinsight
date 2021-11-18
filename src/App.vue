<template>
  <div class="w-screen h-screen p-5">
    <Navigation />
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { sessionStore } from '@/stores'
import { useRouter } from 'vue-router'
import Navigation from './components/Navigation.vue'

export default defineComponent({
  name: 'App',
  setup() {
    const router = useRouter()
    const currentPage = ref(router.currentRoute)
    const isLoading = ref(true)
    const routerGuard = () => {
      if (currentPage.value.meta.auth && !sessionStore.connected.value) router.push('/login')
    }
    watch(currentPage, routerGuard)
    onMounted(async () => {
      await sessionStore.restore()
      routerGuard()
      isLoading.value = false
    })
    return { isLoading }
  },
  components: { Navigation },
})
</script>
