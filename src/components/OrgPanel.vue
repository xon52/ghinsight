<template>
  <h1>Org</h1>
  <pre>{{ JSON.stringify(org, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const org = githubStore.org
</script>
