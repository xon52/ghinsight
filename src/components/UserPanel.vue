<template>
  <div>
    <template v-if="user">
      <x-card>
        <div class="flex justify-start">
          <x-avatar :src="`https://avatars.githubusercontent.com/u/${user.id}?v=4`" />
          <a class="my-auto ml-5 text-4xl text" :href="`https://github.com/${user?.login}`" target="_blank">
            {{ user.login }}
          </a>
        </div>
      </x-card>
    </template>
    <p v-else>Loading</p>
  </div>
</template>

<script setup lang="ts">
import { githubStore } from '@/stores'
import { XAvatar, XCard } from '@/utils/components'

const user = githubStore.user
</script>
