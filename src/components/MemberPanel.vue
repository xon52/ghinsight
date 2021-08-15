<template>
  <h1>Members</h1>
  <pre>{{ JSON.stringify(members, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const members = githubStore.members
</script>
