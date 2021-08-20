<template>
  <template-panel
    v-if="user"
    :text="user.login"
    :img="`https://avatars.githubusercontent.com/u/${user.id}?v=4`"
    :url="`https://github.com/${user.login}`"
    to="/u/user"
  />
  <p v-else>{{ userStatus }}</p>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'

const user = githubStore.user
const userStatus = githubStore.userStatus
</script>
