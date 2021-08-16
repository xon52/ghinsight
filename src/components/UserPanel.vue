<template>
  <n-card>
    <template v-if="user">
      <n-avatar round :size="48" :src="`https://avatars.githubusercontent.com/u/${user.id}?v=4`" />
      <div>
        <a :href="`https://github.com/${user?.login}`" target="_blank">{{ user.login }}</a>
      </div>
    </template>
    <n-skeleton v-else text width="60%" />
  </n-card>
  <h1>User</h1>
  <pre>{{ JSON.stringify(user, null, 2) }}</pre>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'
import { NAvatar, NCard, NSkeleton } from 'naive-ui'

const user = githubStore.user
</script>
