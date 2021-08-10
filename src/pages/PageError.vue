<template>
  <Dialog :visible="true" class="m-2 w-30rem" :draggable="false" :closable="false" modal :header="`${code} Error`">
    <p>😮 You found an error!</p>
    <p>Best <a href="#" @click="goHome">go home</a>.</p>
  </Dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'PageError',
  setup() {
    const router = useRouter()
    const code = router.currentRoute.value.params.code
    const goHome = () => router.push('/')
    return { goHome, code }
  },
})
</script>
