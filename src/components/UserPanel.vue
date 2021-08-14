<template>
  <Chip v-if="user" v-tooltip.right="`ID: ${user.id}${user.admin?'\nAdmin':''}`" :image="user.avatar_url" :label="user.login" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { githubStore } from '@/stores'

export default defineComponent({
  setup() {
    const user = githubStore.user
    return { user }
  },
})
</script>
