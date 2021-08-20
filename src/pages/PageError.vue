<template>
  <x-modal :open="true" class="min-w-60">
    <x-card :title="`${code} Error`">
      <p>😮 You found an error!</p>
      <p>Best <a href="#" @click="goHome">go home</a>.</p>
    </x-card>
  </x-modal>
</template>

<script setup lang="ts">
import { XModal, XCard } from '@/utils/components'
import { useRouter } from 'vue-router'
const router = useRouter()
const code = router.currentRoute.value.params.code
const goHome = () => router.push('/')
</script>
