<template>
  <h1>User</h1>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const user = githubStore.user
</script>
