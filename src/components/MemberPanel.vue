<template>
  <template-panel v-if="members.length > 0" :text="`Members: ${members.length}`" :img="avatars" to="/u/members" />
  <p v-else>{{ membersStatus }}</p>
</template>

<script setup lang="ts">
import TemplatePanel from './TemplatePanel.vue'
import { githubStore } from '@/stores'
import { computed } from 'vue';

const members = githubStore.members
const membersStatus = githubStore.membersStatus
const avatars = computed(()=> members.value.slice(0,3).map(e=>`https://avatars.githubusercontent.com/u/${e.id}?v=4`))
</script>
