<template>
  <h1>Repos</h1>
  <pre>{{ JSON.stringify(repos, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const repos = githubStore.repos
</script>
