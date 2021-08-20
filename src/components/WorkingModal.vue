<template>
  <x-modal :open="!!working" class="min-w-60">
    <x-card :title="`${working}...`">
      <p>Working</p>
    </x-card>
  </x-modal>
</template>

<script setup lang="ts">
import { XModal, XCard } from '@/utils/components'
import { githubStore } from '@/stores'
const working = githubStore.working
</script>
