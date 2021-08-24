<template>
  <x-card class="cursor-pointer group" @click="handleClick">
    <div class="flex justify-start align-middle">
      <x-avatar v-if="img" :src="img" sm />
      <div class="my-auto ml-6 text-2xl">
        <span>
          {{ text }}
          <a
            v-if="url"
            @click.stop
            class="hidden p-1 no-underline group-hover:inline-block hover:ring-1 ring-blue-300"
            :href="url"
            target="_blank"
          >
            🔗
          </a>
        </span>
      </div>
    </div>
    <template #footer>
      <slot></slot>
    </template>
  </x-card>
</template>

<script setup lang="ts">
import { XAvatar, XCard } from '@/utils/components'
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
  img: { type: [String, Array] },
  text: { type: String },
  url: { type: String },
  to: { type: String },
})

const handleClick = () => {
  if (props.to) router.push(props.to)
}
</script>
