<template>
  <template-panel v-if="teams.length > 0" :text="`Teams: ${teams.length}`" to="/u/teams" />
  <p v-else>{{ teamsStatus }}</p>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'

const teams = githubStore.teams
const teamsStatus = githubStore.teamsStatus
</script>
