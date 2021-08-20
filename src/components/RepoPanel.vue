<template>
  <template-panel v-if="repos.length > 0" :text="`Repos: ${repos.length}`" to="/u/repos" />
  <p v-else>{{ reposStatus }}</p>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'

const repos = githubStore.repos
const reposStatus = githubStore.reposStatus
</script>
