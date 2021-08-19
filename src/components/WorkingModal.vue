<template>
  <page-modal :show="!!working" :title="`${working}...`">
    <n-spin size="large" />
  </page-modal>
</template>

<script setup lang="ts">
import { PageModal } from '@/components'
import { githubStore } from '@/stores'
const working = githubStore.working
</script>
