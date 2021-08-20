<template>
  <x-modal :open="true" class="min-w-60">
    <x-card title="Page not found">
      <p>🤔 Can't find that page.</p>
      <p>Your options are <a href="#" @click="goBack">go back</a> or <a href="#" @click="goHome">go home</a>.</p>
    </x-card>
  </x-modal>
</template>

<script setup lang="ts">
import { XModal, XCard } from '@/utils/components'
import { useRouter } from 'vue-router'
const router = useRouter()
const goHome = () => router.push('/')
const goBack = () => router.back()
</script>
