<template>
  <page-modal :show="true" title="Page not found">
    <p>🤔 Can't find that page.</p>
    <p>Your options are <a href="#" @click="goBack">go back</a> or <a href="#" @click="goHome">go home</a>.</p>
  </page-modal>
</template>

<script setup lang="ts">
import { PageModal } from '@/components'
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => router.push('/')
const goBack = () => router.back()
</script>
