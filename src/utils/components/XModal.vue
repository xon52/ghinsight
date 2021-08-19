<template>
  <div
    v-if="_open"
    :class="`modal fixed w-full h-full top-0 left-0 flex items-center justify-center`"
  >
    <div class="absolute w-full h-full bg-gray-900 opacity-50"></div>
    <div class="z-10 shadow">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

const props = defineProps({
  open: Boolean,
})

const _open = computed(() => props.open)
</script>

<style>
.modal {
  transition: opacity 0.25s ease;
}
</style>
