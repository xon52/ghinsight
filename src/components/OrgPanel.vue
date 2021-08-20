<template>
  <template-panel
    v-if="org"
    :text="org.login"
    :img="`https://avatars.githubusercontent.com/u/${org.id}?v=4`"
    :url="`https://github.com/${org.login}`"
    to="/u/org"
  />
  <p v-else>{{ orgStatus }}</p>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'
import { watch } from 'vue'

const org = githubStore.org
const orgStatus = githubStore.orgStatus
</script>
