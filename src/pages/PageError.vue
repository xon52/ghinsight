<template>
  <page-modal :show="true" :title="`${code} Error`">
    <p>😮 You found an error!</p>
    <p>Best <a href="#" @click="goHome">go home</a>.</p>
  </page-modal>
</template>

<script setup lang="ts">
import { PageModal } from '@/utils'
import { useRouter } from 'vue-router'
const router = useRouter()
const code = router.currentRoute.value.params.code
const goHome = () => router.push('/')
</script>
