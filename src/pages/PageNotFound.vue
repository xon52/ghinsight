<template>
  <Dialog :visible="true" class="m-2 w-30rem" :draggable="false" :closable="false" modal header="Page not found">
    <p>🤔 Can't find that page.</p>
    <p>Your options are <a href="#" @click="goBack">go back</a> or <a href="#" @click="goHome">go home</a>.</p>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageNotFound',
  setup() {
    const router = useRouter()
    const goHome = () => router.push('/')
    const goBack = () => router.back()
    return { goHome, goBack }
  },
})
</script>
