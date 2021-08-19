<template>
  <img class="rounded-full" :class="size" :src="src" @click="$emit('click', $event)" :alt="alt" />
</template>

<script lang="ts" setup>
import { computed } from '@vue/runtime-core'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: 'avatar' },
  sm: { type: Boolean, default: false },
  lg: { type: Boolean, default: false },
})
const size = computed(() => {
  if (props.sm) return 'w-10'
  if (props.lg) return 'w-40'
  return 'w-20'
})
</script>
