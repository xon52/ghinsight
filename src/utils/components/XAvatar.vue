<template>
  <div :class="`relative ${sm ? '-space-x-6' : lg ? '-space-x-24' : '-space-x-10'}`">
    <template v-for="(s, i) in srcs" :key="i">
      <img
        class="relative inline border border-gray-300 border-solid rounded-full shadow"
        :class="size"
        :src="s"
        @click="$emit('click', $event)"
        :alt="alt"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  src: { type: [String, Array], required: true },
  alt: { type: String, default: 'avatar' },
  sm: { type: Boolean, default: false },
  lg: { type: Boolean, default: false },
})
const size = computed(() => {
  if (props.sm) return 'w-12'
  if (props.lg) return 'w-40'
  return 'w-20'
})
const srcs = (Array.isArray(props.src) ? props.src : [props.src]) as string[]
</script>
