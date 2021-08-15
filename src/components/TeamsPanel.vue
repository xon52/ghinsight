<template>
  <h1>Teams</h1>
  <pre>{{ JSON.stringify(teams, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'

const teams = githubStore.teams
</script>
