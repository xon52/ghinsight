<template>
  <button
    class="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm  hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:bg-gray-200 disabled:text-gray-400 disabled:cursor-not-allowed"
    @click.stop="$emit('click', $event)"
    :disabled="disabled"
    :type="type"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'

type ButtonTypes = 'button' | 'submit' | 'reset'

defineEmits({
  click: (e: MouseEvent) => e,
})

defineProps({
  disabled: { type: Boolean, default: false },
  type: { type: String as PropType<ButtonTypes>, default: 'button' },
})
</script>
