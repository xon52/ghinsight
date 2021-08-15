<template>
  <div style="height: 100vh; width: 100vw">
    <n-message-provider>
      <router-view />
    </n-message-provider>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import { sessionStore } from '@/stores'
import { useRouter } from 'vue-router'
import { NMessageProvider } from 'naive-ui'

export default defineComponent({
  name: 'App',
  components: { NMessageProvider },
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
})
</script>
