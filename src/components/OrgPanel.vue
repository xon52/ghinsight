<template>
  <Avatar v-if="org" v-tooltip.left="org.name || org.login" :image="org.avatar_url" size="xlarge" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { githubStore } from '@/stores'

export default defineComponent({
  setup() {
    const org = githubStore.org
    return { org }
  },
})
</script>
